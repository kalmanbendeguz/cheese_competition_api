const find = async (query, user, parent_session) => {

    // 1. Validate query
    const find_entry_fee_payment_validator = require('../../../validators/requests/api/entry_fee_payment/find')
    try {
        await find_entry_fee_payment_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize find
    const authorizer = require('../../../authorizers/entities/entry_fee_payment')
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
    const Entry_Fee_Payment_Model = require('../../../models/Entry_Fee_Payment')
    const session = parent_session ?? await Entry_Fee_Payment_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Find
    const filter = query.filter
    const projection = query.projection
    const options = query.options

    const entry_fee_payments = await Entry_Fee_Payment_Model.find(
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
        data: entry_fee_payments,
    }
}

module.exports = find