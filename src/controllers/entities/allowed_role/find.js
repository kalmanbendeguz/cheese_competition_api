const find = async (query, user, parent_session) => {

    // 1. Validate query
    const find_allowed_role_validator = require('../../../validators/requests/api/allowed_role/find')
    try {
        await find_allowed_role_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }
    
    // 2. Authorize find
    const authorizer = require('../../../authorizers/entities/allowed_role')
    try {
        query.filter = authorizer(query.filter ?? {}, 'find', user)
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }

    // 3. Authorize project
    try {
        query.projection = authorizer(query.projection, 'project', user)
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

    // 5. Find
    const filter = query.filter
    const projection = query.projection
    const options = query.options

    const allowed_roles = await Allowed_Role_Model.find(
        filter,
        projection,
        { ...options, session: session }
    )

    // 6. Validate documents
    // Because we only get the projected fields from the DB, we won't validate queried documents.

    // 7. Commit transaction and end session
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 8. Send
    return {
        code: 200,
        data: allowed_roles,
    }
}

module.exports = find