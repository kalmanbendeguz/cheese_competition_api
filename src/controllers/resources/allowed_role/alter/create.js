const create = async (body, user, parent_session) => {

    // 1. Validate body
    const create_allowed_role_validator = require('../../../validators/requests/api/allowed_role/create')
    try {
        await create_allowed_role_validator.validateAsync(body)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Arrayize
    body = Array.isArray(body) ? body : [body]

    // 3. Authorize create
    const authorizer = require('../../../authorizers/entities/allowed_role')
    try {
        body = body.map((allowed_role) => authorizer(allowed_role, 'create', user))
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }

    // 4. Start session and transaction if they don't exist
    const Allowed_Role_Model = require('../../../models/Allowed_Role')
    const session = parent_session ?? await Allowed_Role_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Create locally
    const _allowed_roles = body.map((allowed_role) => ({
        email: allowed_role.email,
        allowed_roles: allowed_role.allowed_roles
    }))
    const allowed_roles = _allowed_roles.map((allowed_role) => new Allowed_Role_Model(allowed_role))

    // 6. Validate created documents
    const allowed_role_validator = require('../../../validators/schemas/Allowed_Role')
    try {
        const validator_promises = allowed_roles.map((allowed_role) =>
            allowed_role_validator.validateAsync(allowed_role)
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
    // Dependencies: [Allowed_Role]

    // 8. Check collection integrity
    // email should be unique
    const new_emails = allowed_roles.map(allowed_role => allowed_role.email)
    const unique_new_emails = [...new Set(new_emails)]
    if (new_emails.length !== unique_new_emails.length) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        } return {
            code: 409,
            data: 'provided_allowed_role_emails_are_not_unique',
        }
    }
    if (await Allowed_Role_Model.exists({
        email: { $in: unique_new_emails },
    }, { session: session })
    ) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        } return {
            code: 409,
            data: 'at_least_one_provided_allowed_role_email_already_exists_in_db',
        }
    }

    // 9. Save created documents
    await Allowed_Role_Model.bulkSave(allowed_roles, { session: session })

    // 10. Update dependents
    // Nothing needs to be updated.
    // Don't add roles to existing users, because they might have to provide additional data to be able to have that role.
    // The user will add the role for himself.

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