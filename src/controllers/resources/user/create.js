const create = async (body, user, parent_session) => {

    // 1. Validate body
    const create_user_validator = require('../../../validators/requests/api/user/create')
    try {
        await create_user_validator.validateAsync(body)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Arrayize
    body = Array.isArray(body) ? body : [body]

    // 3. Authorize create
    const authorizer = require('../../../authorizers/entities/user')
    try {
        body = body.map((u) => authorizer(u, 'create', user))
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }

    // 4. Start session and transaction if they don't exist
    const User_Model = require('../../../models/User')
    const session = parent_session ?? await User_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Create locally
    const randomstring = require('randomstring')
    for (const u of body) {
        let confirm_registration_id
        do {
            confirm_registration_id = randomstring.generate({
                length: 32,
                charset: 'alphanumeric',
                capitalization: 'lowercase',
            })
        } while (
            (await User_Model.exists({
                confirm_registration_id: confirm_registration_id,
            }, { session: session }))
            ||
            body.some(
                (u) =>
                    u.confirm_registration_id === confirm_registration_id
            )
        )
        u.confirm_registration_id = confirm_registration_id
    }

    const _users = body.map((u) => ({
        email: u.email,
        username: u.username,
        hashed_password: u.hashed_password,
        roles: [],
        registration_temporary: true,
        confirm_registration_id: u.confirm_registration_id,
    }))
    const users = _users.map((u) => new User_Model(u))

    // 6. Validate created documents
    const user_validator = require('../../../validators/schemas/User')
    try {
        const validator_promises = users.map((u) =>
            user_validator.validateAsync(u)
        )
        await Promise.all(validator_promises)
    } catch (err) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return { code: 400, data: err.details }
    }

    // 7. Check dependencies: Ask all dependencies if this creation is possible.
    const dependencies = ['allowed_role', 'competition']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/user`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(users.map(u => ({ old: null, new: u })), user, session))
    }
    const dependency_approver_results = await Promise.all(dependency_approver_promises)

    const unapproved = dependency_approver_results.find(dependency_approver_result => !dependency_approver_result.approved)
    if (unapproved) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return {
            code: 403,
            data: unapproved.reason
        }
    }

    // 8. Check collection integrity
    // We need uniqueness of email, username and confirm_registration_id
    // confirm_registration_id uniqueness is ensured at creation

    // uniqueness of email
    const new_emails = users.map(u => u.email)
    const unique_new_emails = [...new Set(new_emails)]
    if (new_emails.length !== unique_new_emails.length) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        } return {
            code: 409,
            data: 'provided_user_emails_are_not_unique',
        }
    }

    for (const u of users) {
        if (
            await User_Model.exists({
                email: u.email,
            }, { session: session })
        ) {
            if (!parent_session) {
                if (session.inTransaction()) await session.abortTransaction()
                await session.endSession()
            }
            return {
                code: 409,
                data: 'at_least_one_provided_user_email_already_exists_in_db',
            }
        }
    }

    // uniqueness of username
    const new_usernames = users.map(u => u.username)
    const unique_new_usernames = [...new Set(new_usernames)]
    if (new_usernames.length !== unique_new_usernames.length) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        } return {
            code: 409,
            data: 'provided_user_usernames_are_not_unique',
        }
    }

    for (const u of users) {
        if (
            await User_Model.exists({
                username: u.username,
            }, { session: session })
        ) {
            if (!parent_session) {
                if (session.inTransaction()) await session.abortTransaction()
                await session.endSession()
            }
            return {
                code: 409,
                data: 'at_least_one_provided_user_username_already_exists_in_db',
            }
        }
    }

    // 9. Save created documents
    await User_Model.bulkSave(users, { session: session })

    // 10. Update dependents
    // Nothing needs to be updated

    // 11. Commit transaction and end session.
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 12. Reply
    return {
        code: 201,
        data: undefined,
    }
}

module.exports = create