const update_transaction = (/* No specific start_session logic. */ access_update) => async (filter, content, actor) => {
    let session
    try {
        const db = require('../../../../config/db')
        session = await db.startSession()
        if (!session.inTransaction()) session.startTransaction()
    } catch (error) {
        throw {
            type: 'start_transaction_error',
            details: {
                error: error
            }
        }
    }

    let access_update_result
    try {
        access_update_result = await access_update(filter, content, actor, session)
    } catch (error) {
        if (session.inTransaction()) await session.abortTransaction()
        await session.endSession()
        throw error
    }

    try {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    } catch (error) {
        throw {
            type: 'commit_transaction_error',
            details: {
                error: error
            }
        }
    }

    return access_update_result
}

module.exports = update_transaction