const find_one_transaction = (access_find_one) => async (filter, projection, options, actor) => {
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

    let access_find_one_result
    try {
        access_find_one_result = await access_find_one(filter, projection, options, actor, session)
    } catch (error) {
        if (session.inTransaction()) await session.abortTransaction()
        await session.endSession()
        throw {
            type: 'access_find_one_error',
            details: {
                error: error
            }
        }
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

    return access_find_one_result
}

module.exports = find_one_transaction