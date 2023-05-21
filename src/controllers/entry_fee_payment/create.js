// ONLY SERVER
module.exports = async (body, user) => {
    // resource and its dependency models
    const Entry_Fee_Payment_Model = require('../../models/Entry_Fee_Payment')
    const Product_Model = require('../../models/Product')

    // 1. validate body
    const create_entry_fee_payment_validator = require('../../validators/requests/api/entry_fee_payment/create')
    try { await create_entry_fee_payment_validator.validateAsync(body) }
    catch (err) { return { code: 400, data: err.details } }

    // 2. arrayize
    body = Array.isArray(body) ? body : [body]

    // 3. authorize {body, user}
    const authorizer = require('../../authorizers/entry_fee_payment')
    const authorizer_results = body.map(entry_fee_payment => authorizer(entry_fee_payment, 'create', user))
    const violation = authorizer_results.find(result => !result.authorized)
    if (violation) { return { code: 403, data: violation.message } }

    // 4. check_dependencies
    // all products should exist
    const unique_product_ids = [...new Set(body.flatMap(entry_fee_payment => entry_fee_payment.product_ids))]
    if ((await Product_Model.countDocuments({
        _id: { $in: unique_product_ids },
    })) !== unique_product_ids.length) return {
        code: 403,
        data: 'one_or_more_provided_product_ids_are_not_existing'
    }
    // a product cannot be paid twice
    if ((await Entry_Fee_Payment_Model.exists({
        product_ids: { $in: unique_product_ids },
        pending: false
    }))) return {
        code: 403,
        data: 'at_least_one_of_the_provided_products_are_already_paid'
    }
    // an approved product cannot be paid
    if ((await Product_Model.exists({
        _id: { $in: unique_product_ids },
        approved: true
    }))) return {
        code: 403,
        data: 'at_least_one_of_the_provided_products_are_already_approved'
    }

    // 5. prepare
    // product_ids: provided.
    // pending: always true.
    // pos_transaction_id: generate here
    // confirm_payment_id: generate here
    const randomstring = require('randomstring')
    let existing_entry_fee_payment

    for (const entry_fee_payment of body) {
        let pos_transaction_id
        do {
            pos_transaction_id = randomstring.generate({
                length: 32,
                charset: 'alphanumeric',
                capitalization: 'lowercase'
            })

            existing_entry_fee_payment = await Entry_Fee_Payment_Model.exists({ 'pos_transaction_id': pos_transaction_id })
                || body.some(entry_fee_payment => entry_fee_payment.pos_transaction_id === pos_transaction_id)

        } while (existing_entry_fee_payment)
        entry_fee_payment.pos_transaction_id = pos_transaction_id

        let confirm_payment_id
        do {
            confirm_payment_id = randomstring.generate({
                length: 32,
                charset: 'alphanumeric',
                capitalization: 'lowercase'
            })

            existing_entry_fee_payment = await Entry_Fee_Payment_Model.exists({ 'confirm_payment_id': confirm_payment_id })
                || body.some(entry_fee_payment => entry_fee_payment.confirm_payment_id === confirm_payment_id)

        } while (existing_entry_fee_payment)
        entry_fee_payment.confirm_payment_id = confirm_payment_id
    }

    const _entry_fee_payments = body.map(entry_fee_payment => ({
        product_ids: entry_fee_payment.product_ids,
        pending: true,
        pos_transaction_id: entry_fee_payment.pos_transaction_id,
        confirm_payment_id: entry_fee_payment.confirm_payment_id
    }))

    // 6. create
    const entry_fee_payments = _entry_fee_payments.map(entry_fee_payment => new Entry_Fee_Payment_Model(entry_fee_payment))

    // 7. validate_documents
    const entry_fee_payment_validator = require('../../validators/schemas/Entry_Fee_Payment')
    try {
        const validator_promises = entry_fee_payments.map(entry_fee_payment => entry_fee_payment_validator.validateAsync(entry_fee_payment))
        await Promise.all(validator_promises)
    } catch (err) { return { code: 400, data: err.details } }

    // 8. update_dependencies
    // nothing needs to be updated

    // 9. save
    const saver_promises = entry_fee_payments.map(entry_fee_payment => entry_fee_payment.save())
    await Promise.all(saver_promises)

    // 10. reply
    return {
        code: 201,
        data: undefined // TODO, check if it works if i leave it out, etc.
    }
}