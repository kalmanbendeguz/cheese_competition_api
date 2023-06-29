// ONLY SERVER
module.exports = async (body, user, parent_session) => {

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
    const session = parent_session ?? await User_Model.db.startSession()
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
            }, { session: session })) ||
            body.some(
                (u) =>
                    u.confirm_registration_id === confirm_registration_id
            ))
        u.confirm_registration_id = confirm_registration_id
    }
    const _users = body.map((u) => ({
        email: u.email, // ok
        username: u.username, // ok
        hashed_password: u.hashed_password, // ok
        roles: [],
        //full_name: u.full_name, // we dont need this
        //contact_phone_number: u.contact_phone_number,
        //billing_information: u.billing_information, // we dont need this
        // association_member: u.association_member, // we dont need this
        registration_temporary: true, //u.registration_temporary,
        confirm_registration_id: u.confirm_registration_id,
        //table_leader: [], //u.table_leader, // we dont need this
        // arrived: [], //u.arrived, // we dont need this
    }))
    const users = _users.map((u) => new User_Model(u))

    console.log(users)

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
    for (const u of users) {
        if (await User_Model.exists({ email: u.email }, { session: session })
        ) {
            if (!parent_session) {
                if (session.inTransaction()) await session.abortTransaction()
                await session.endSession()
            }
            return {
                code: 409,
                data: 'email_already_exists',
            }
        }
        if (await User_Model.exists({ username: u.username }, { session: session })
        ) {
            if (!parent_session) {
                if (session.inTransaction()) await session.abortTransaction()
                await session.endSession()
            }
            return {
                code: 409,
                data: 'username_already_exists',
            }
        }
        if (await User_Model.exists({ confirm_registration_id: u.confirm_registration_id }, { session: session })
        ) {
            if (!parent_session) {
                if (session.inTransaction()) await session.abortTransaction()
                await session.endSession()
            }
            return {
                code: 409,
                data: 'confirm_registration_id_already_exists',
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
        data: undefined, // TODO: check if it works if i leave it out, etc.
    }
}