const find = async (query, user, parent_session) => {

    // 1. Validate query
    const find_rating_validator = require('../../../validators/requests/api/rating/find')
    try {
        await find_rating_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize find
    const authorizer = require('../../../authorizers/entities/rating')
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
    const Rating_Model = require('../../../models/Rating')
    const session = parent_session ?? await Rating_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()


    // 5. Find
    const filter = query.filter
    const projection = query.projection
    const options = query.options

    const ratings = await Rating_Model.find(
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
        data: ratings,
    }
}

module.exports = find