const start_transaction = async (_1, _2, session) => {
    const db = require('../../../config/db')
    session ??= await db.startSession()
    if (!session.inTransaction()) session.startTransaction()
    return [_1, _2, session]
}

module.exports = start_transaction