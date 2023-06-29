// COMPETITOR, JUDGE, ORGANIZER, RECEIVER, SERVER
module.exports = async (query, user, parent_session) => {

    // 1. Validate query
    const find_user_validator = require('../../../validators/requests/api/user/find')
    try {
        await find_user_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize find
    const authorizer = require('../../../authorizers/entities/user')
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
    const User_Model = require('../../../models/User')
    const session = parent_session ?? await User_Model.db.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Find
    const filter = query.filter
    const projection = query.projection // if you pass an unknown value, it will ignore it
    const options = query.options // limit: validated, skip: validated, sort: what if you pass an unknown key?

    const users = await User_Model.find(
        filter,
        projection, // is undefined okay? or should i convert to null
        { ...options, session: session } // is undefined okay? or should i convert to null
    )

    // 6. Validate documents
    //const user_validator = require('../../../validators/schemas/User')
    //try {
    //    const validator_promises = users.map(
    //        (u) =>
    //            user_validator.validateAsync(
    //                u
    //            )
    //    )
    //    await Promise.all(validator_promises)
    //} catch (err) {
    //    if (!parent_session) {
    //        if (session.inTransaction()) await session.abortTransaction()
    //        await session.endSession()
    //    }
    //    return { code: 500, data: err.details }
    //}

    // 7. Commit transaction and end session
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 8. Send
    return {
        code: 200,
        data: users,
    }
}