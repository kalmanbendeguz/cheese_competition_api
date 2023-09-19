const create = async (body, user, parent_session) => {

    // 1. Validate body
    const create_entry_fee_payment_validator = require('../../../validators/requests/api/entry_fee_payment/create')
    try {
        await create_entry_fee_payment_validator.validateAsync(body)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Arrayize
    body = Array.isArray(body) ? body : [body]

    // 3. Authorize create
    const authorizer = require('../../../authorizers/entities/entry_fee_payment')
    try {
        body = body.map((entry_fee_payment) => authorizer(entry_fee_payment, 'create', user))
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

    // 5. Create locally
    const randomstring = require('randomstring')
    let existing_entry_fee_payment

    for (const entry_fee_payment of body) {
        let pos_transaction_id
        do {
            pos_transaction_id = randomstring.generate({
                length: 32,
                charset: 'alphanumeric',
                capitalization: 'lowercase',
            })

            existing_entry_fee_payment =
                (await Entry_Fee_Payment_Model.exists({ pos_transaction_id: pos_transaction_id }))
                || body.some((entry_fee_payment) => entry_fee_payment.pos_transaction_id === pos_transaction_id)
        } while (existing_entry_fee_payment)
        entry_fee_payment.pos_transaction_id = pos_transaction_id

        let confirm_payment_id
        do {
            confirm_payment_id = randomstring.generate({
                length: 32,
                charset: 'alphanumeric',
                capitalization: 'lowercase',
            })

            existing_entry_fee_payment =
                (await Entry_Fee_Payment_Model.exists({ confirm_payment_id: confirm_payment_id }))
                || body.some((entry_fee_payment) => entry_fee_payment.confirm_payment_id === confirm_payment_id)
        } while (existing_entry_fee_payment)
        entry_fee_payment.confirm_payment_id = confirm_payment_id
    }

    const _entry_fee_payments = body.map((entry_fee_payment) => ({
        product_ids: entry_fee_payment.product_ids,
        pending: true,
        pos_transaction_id: entry_fee_payment.pos_transaction_id,
        confirm_payment_id: entry_fee_payment.confirm_payment_id
    }))
    const entry_fee_payments = _entry_fee_payments.map((entry_fee_payment) => new Entry_Fee_Payment_Model(entry_fee_payment))

    // 6. Validate created documents
    const entry_fee_payment_validator = require('../../../validators/schemas/Entry_Fee_Payment')
    try {
        const validator_promises = entry_fee_payments.map((entry_fee_payment) =>
            entry_fee_payment_validator.validateAsync(entry_fee_payment)
        )
        await Promise.all(validator_promises)
    } catch (err) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return { code: 400, data: err.details }
    }

    // 7. Check dependencies: Ask all dependencies if this creation is possible.
    const dependencies = ['product']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/entry_fee_payment`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(entry_fee_payments.map(entry_fee_payment => ({ old: null, new: entry_fee_payment })), user, session))
    }
    const dependency_approver_results = await Promise.all(dependency_approver_promises)

    const unapproved = dependency_approver_results.find(dependency_approver_result => !dependency_approver_result.approved)
    if (unapproved) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return {
            code: 403,
            data: unapproved.reason
        }
    }

    // 8. Check collection integrity
    // pos_transaction_id and confirm_payment_id uniqueness is ensured at creation.
    // There can't be two Entry_Fee_Payments for the same Product
    const unique_product_ids =
        [...new Set(entry_fee_payments.flatMap((entry_fee_payment) => entry_fee_payment.product_ids))]
    if (
        await Entry_Fee_Payment_Model.exists({
            product_ids: { $in: unique_product_ids },
            pending: false,
        })
    ) {
        return {
            code: 403,
            data: 'at_least_one_of_the_provided_products_are_already_paid',
        }
    }

    // 9. Save created documents
    await Entry_Fee_Payment_Model.bulkSave(entry_fee_payments, { session: session })

    // 10. Update dependents
    // Entry_Fee_Payment has no dependents.

    // 11. Commit transaction and end session.
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 12. Reply
    return {
        code: 201,
        data: undefined,
    }
}

module.exports = create