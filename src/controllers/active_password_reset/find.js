// ONLY SERVER
module.exports = async (query, user, parent_session) => {

    // 1. Validate query
    const find_active_password_reset_validator = require('../../validators/requests/api/active_password_reset/find')
    try {
        await find_active_password_reset_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize find
    const authorizer = require('../../authorizers/active_password_reset')
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
    const Active_Password_Reset_Model = require('../../models/Active_Password_Reset')
    const session = parent_session ?? await Active_Password_Reset_Model.db.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Find
    const filter = query.filter
    const projection = query.projection // if you pass an unknown value, it will ignore it
    const options = query.options // limit: validated, skip: validated, sort: what if you pass an unknown key?

    const active_password_resets = await Active_Password_Reset_Model.find(
        filter,
        projection, // is undefined okay? or should i convert to null
        { ...options, session: session } // is undefined okay? or should i convert to null
    )

    // 6. Validate documents
   // const active_password_reset_validator = require('../../validators/schemas/Active_Password_Reset')
   // try {
   //     const validator_promises = active_password_resets.map(
   //         (active_password_reset) =>
   //             active_password_reset_validator.validateAsync(
   //                 active_password_reset
   //             )
   //     )
   //     await Promise.all(validator_promises)
   // } catch (err) {
   //     if (!parent_session) {
   //         if (session.inTransaction()) await session.abortTransaction()
   //         await session.endSession()
   //     }
   //     return { code: 500, data: err.details }
   // }

    // 7. Commit transaction and end session
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 8. Send
    return {
        code: 200,
        data: active_password_resets,
    }
}
