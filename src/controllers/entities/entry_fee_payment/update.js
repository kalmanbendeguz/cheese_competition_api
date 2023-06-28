// ONLY SERVER
module.exports = async (data, user) => {
    // 1. validate data
    const update_entry_fee_payment_validator = require('../../../validators/requests/api/entry_fee_payment/update')
    try {
        await update_entry_fee_payment_validator.validateAsync(data)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. authorize updatable
    const authorizer = require('../../../authorizers/entry_fee_payment')
    const updatable_authorizer_result = authorizer(
        data.query,
        'updatable',
        user
    )
    if (!updatable_authorizer_result.authorized) {
        return { code: 403, data: updatable_authorizer_result.message }
    }

    // 3. authorize update
    const update_authorizer_result = authorizer(data.body, 'update', user)
    if (!update_authorizer_result.authorized) {
        return { code: 403, data: update_authorizer_result.message }
    }

    // 3. prepare find
    const filter = data.query

    // 4. find
    const Entry_Fee_Payment_Model = require('../../../models/Entry_Fee_Payment')
    const entry_fee_payments = await Entry_Fee_Payment_Model.find(
        filter
        //projection, // is undefined okay? or should i convert to null
        //options // is undefined okay? or should i convert to null
    )
    if (entry_fee_payments.length === 0)
        return {
            code: 404,
            data: 'no_documents_found_to_update',
        }

    // 5. check dependencies: will the database be consistent after this update?
    if (entry_fee_payments.length === 0) {
        // check nothing; code wont even reach this ever
    }
    if (entry_fee_payments.length > 1)
        return {
            code: 403,
            data: 'only_possible_to_update_one_entry_fee_payment_at_a_time',
        }
    if (data.body.pending === true)
        return {
            code: 403,
            data: 'not_possible_to_set_pending_to_true',
        }
    //barion_payment_id should be unique
    if (
        await Entry_Fee_Payment_Model.exists({
            barion_payment_id: data.body.barion_payment_id,
        })
    )
        return {
            code: 409,
            data: 'barion_payment_id_already_exists',
        }
    //barion_transaction_id should be unique
    if (
        await Entry_Fee_Payment_Model.exists({
            barion_transaction_id: data.body.barion_transaction_id,
        })
    )
        return {
            code: 409,
            data: 'barion_transaction_id_already_exists',
        }

    // 6. prepare_update
    const update = data.body
    const remove = []

    // 7. update
    for (const entry_fee_payment of entry_fee_payments) {
        entry_fee_payment.set(update)

        for (const key of remove) {
            entry_fee_payment[key] = undefined
        }
    }

    // 8. validate documents
    const entry_fee_payment_validator = require('../../../validators/schemas/Entry_Fee_Payment')
    try {
        const validator_promises = entry_fee_payments.map((entry_fee_payment) =>
            entry_fee_payment_validator.validateAsync(entry_fee_payment)
        )
        await Promise.all(validator_promises)
    } catch (err) {
        return { code: 500, data: err.details }
    }

    // 9. update dependencies
    // if we set a payment to succeeded, then all the products should be approved.

    // 10. save
    const saver_promises = active_password_resets.map((active_password_reset) =>
        active_password_reset.save()
    )
    await Promise.all(saver_promises)

    // 11. reply
    return {
        code: 200,
        data: undefined,
    }
}
