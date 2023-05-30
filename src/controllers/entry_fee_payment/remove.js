// ONLY SERVER
module.exports = async (query, user) => {
    // 1. validate query
    const remove_entry_fee_payment_validator = require('../../validators/requests/api/entry_fee_payment/remove')
    try {
        await remove_entry_fee_payment_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. authorize {query, user}
    const authorizer = require('../../authorizers/entry_fee_payment')
    const authorizer_result = authorizer(query, 'remove', user)
    if (!authorizer_result.authorized) {
        return { code: 403, data: authorizer_result.message }
    }

    // 3. prepare find
    const filter = query

    // 4. find
    const Entry_Fee_Payment_Model = require('../../models/Entry_Fee_Payment')
    const entry_fee_payments = await Entry_Fee_Payment_Model.find(
        filter
        //projection, // ez sem kell.
        //options // nem kell, mert csak sort, limit, skip, és lean lehetne, de egyik sem kell.
    )
    if (entry_fee_payments.length === 0)
        return {
            code: 404,
            data: 'no_documents_found_to_remove',
        }

    // 5. check dependencies
    // it is not possible to remove a succeeded payment.
    if (
        entry_fee_payments.some(
            (entry_fee_payment) => !entry_fee_payment.pending
        )
    )
        return {
            code: 403,
            data: 'it_is_forbidden_to_remove_a_succeeded_payment',
        }

    // 6. update dependencies
    // nothing needs to be done here. if we would be able to remove succeeded payments, then we
    // would have to set the products's approved to false, and remove the approval type field.

    // 7. remove
    const ids_to_delete = entry_fee_payments.map(
        (entry_fee_payment) => entry_fee_payment._id
    )
    await Entry_Fee_Payment_Model.deleteMany({
        _id: { $in: ids_to_delete },
    })

    // 8. reply
    return {
        code: 200,
        data: undefined,
    }
}
