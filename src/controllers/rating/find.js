// JUDGE, ORGANIZER, SERVER
module.exports = async (query, user, parent_session) => {

    // 1. Validate query
    const find_rating_validator = require('../../validators/requests/api/rating/find')
    try {
        await find_rating_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize find
    const authorizer = require('../../authorizers/rating')
    try {
        query.filter = authorizer(query.filter, 'find', user)
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
    const Rating_Model = require('../../models/Rating')
    const session = parent_session ?? await Rating_Model.db.startSession()
    if (!session.inTransaction()) session.startTransaction()


    // 5. Find
    const filter = query.filter
    const projection = query.projection // if you pass an unknown value, it will ignore it
    const options = query.options // limit: validated, skip: validated, sort: what if you pass an unknown key?

    const ratings = await Rating_Model.find(
        filter,
        projection, // is undefined okay? or should i convert to null
        { ...options, session: session } // is undefined okay? or should i convert to null
    )

    // 6. Validate documents
    const rating_validator = require('../../validators/schemas/Rating')
    try {
        const validator_promises = ratings.map(
            (rating) =>
                rating_validator.validateAsync(
                    rating
                )
        )
        await Promise.all(validator_promises)
    } catch (err) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return { code: 500, data: err.details }
    }

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
