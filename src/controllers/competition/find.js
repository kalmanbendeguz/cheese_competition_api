// COMPETITOR, JUDGE, ORGANIZER, RECEIVER, SERVER
module.exports = async (query, user, parent_session) => {

    // 1. Validate query
    const find_competition_validator = require('../../validators/requests/api/competition/find')
    try {
        await find_competition_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize find
    const authorizer = require('../../authorizers/competition')
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
    const Competition_Model = require('../../models/Competition')
    const session = parent_session ?? await Competition_Model.db.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Find
    const filter = query.filter
    const projection = query.projection // if you pass an unknown value, it will ignore it
    const options = query.options // limit: validated, skip: validated, sort: what if you pass an unknown key?

    const competitions = await Competition_Model.find(
        filter,
        projection, // is undefined okay? or should i convert to null
        { ...options, session: session } // is undefined okay? or should i convert to null
    )

    // 6. Validate documents
    const competition_validator = require('../../validators/schemas/Competition')
    try {
        const validator_promises = competitions.map(
            (competition) =>
                competition_validator.validateAsync(
                    competition
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
        data: competitions,
    }
}
