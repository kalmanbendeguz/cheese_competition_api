const update = async (data, user, parent_session) => {

    // 1. Validate data
    const update_entry_fee_payment_validator = require('../../../validators/requests/api/entry_fee_payment/update')
    try {
        await update_entry_fee_payment_validator.validateAsync(data)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize updatable
    const authorizer = require('../../../authorizers/entities/entry_fee_payment')
    try {
        data.query = authorizer(data.query, 'updatable', user)
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }
    const filter = data.query

    // 3. Authorize update
    try {
        data.body = authorizer(data.body, 'update', user)
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }
    const update = data.body

    // 4. Start session and transaction if they don't exist
    const Entry_Fee_Payment_Model = require('../../../models/Entry_Fee_Payment')
    const session = parent_session ?? await Entry_Fee_Payment_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Find
    const entry_fee_payments = (await Entry_Fee_Payment_Model.find(
        filter,
        null,
        { session: session }
    )).map(entry_fee_payment => ({ old: structuredClone(entry_fee_payment), new: entry_fee_payment }))
    if (entry_fee_payments.length === 0) {
        if (!parent_session) {
            if (session.inTransaction()) await session.commitTransaction()
            await session.endSession()
        }
        return {
            code: 200,
            data: 'no_documents_found_to_update',
        }
    }

    // 6. Update locally
    // We need to go in a topological order.
    // For every field, we deal with the field and its dependencies, but not its dependents.
    // We need to do type casting here, if needed.
    for (const entry_fee_payment of entry_fee_payments) {
        const current_update = structuredClone(update)
        const current_remove = []

        // product_ids cannot be changed
        // pending CAN be changed (once), OK
        // barion_payment_id CAN be changed (once), OK  
        // barion_transaction_id CAN be changed (once), OK

        // amount CAN be changed (once), we need to cast it
        // comes as a string, we need to convert it to Decimal128
        if (
            'amount' in current_update
        ) {
            const { mongoose: { Types: { Decimal128 }, }, } = require('mongoose')
            current_update.amount = Decimal128.fromString(current_update.amount)
        }

        // currency CAN be changed (once), OK

        // pos_transaction_id
        if (
            'pending' in current_update &&
            entry_fee_payment.old.pending === true &&
            current_update.pending === false
        ) {
            current_remove = current_remove.concat(['pos_transaction_id'])
        }

        // confirm_payment_id
        if (
            'pending' in current_update &&
            entry_fee_payment.old.pending === true &&
            current_update.pending === false
        ) {
            current_remove = current_remove.concat(['confirm_payment_id'])
        }

        entry_fee_payment.new.set(current_update)
        for (const key of current_remove) {
            entry_fee_payment.new[key] = undefined
        }
    }

    // 7. Validate new documents
    const entry_fee_payment_validator = require('../../../validators/schemas/Entry_Fee_Payment')
    try {
        const validator_promises = entry_fee_payments.map((entry_fee_payment) =>
            entry_fee_payment_validator.validateAsync(entry_fee_payment.new)
        )
        await Promise.all(validator_promises)
    } catch (err) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return { code: 500, data: err.details }
    }

    // 8. Check dependencies: Ask all dependencies if this update is possible.
    const dependencies = ['product']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/entry_fee_payment`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(entry_fee_payments, user, session))
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

    // 9. Check collection integrity
    // barion_payment_ids should be unique
    if ('barion_payment_id' in update) {
        const new_barion_payment_ids = entry_fee_payments.map(entry_fee_payment => entry_fee_payment.new.barion_payment_id)
        const unique_barion_payment_ids = [...new Set(new_barion_payment_ids)]

        if (new_barion_payment_ids.length !== unique_barion_payment_ids.length) {
            if (!parent_session) {
                if (session.inTransaction()) await session.abortTransaction()
                await session.endSession()
            }
            return {
                code: 409,
                data: 'provided_new_barion_payment_ids_are_not_unique',
            }
        }
        if (await Entry_Fee_Payment_Model.exists({
            _id: { $nin: entry_fee_payments.map(entry_fee_payment => entry_fee_payment.new._id.toString()) },
            barion_payment_id: { $in: unique_barion_payment_ids },
        }, { session: session })
        ) {
            if (!parent_session) {
                if (session.inTransaction()) await session.abortTransaction()
                await session.endSession()
            }
            return {
                code: 409,
                data: 'at_least_one_provided_barion_payment_id_already_exists_in_db',
            }
        }
    }

    // barion_transaction_ids should be unique
    if ('barion_transaction_id' in update) {
        const new_barion_transaction_ids = entry_fee_payments.map(entry_fee_payment => entry_fee_payment.new.barion_transaction_id)
        const unique_barion_transaction_ids = [...new Set(new_barion_transaction_ids)]

        if (new_barion_transaction_ids.length !== unique_barion_transaction_ids.length) {
            if (!parent_session) {
                if (session.inTransaction()) await session.abortTransaction()
                await session.endSession()
            }
            return {
                code: 409,
                data: 'provided_new_barion_transaction_ids_are_not_unique',
            }
        }
        if (await Entry_Fee_Payment_Model.exists({
            _id: { $nin: entry_fee_payments.map(entry_fee_payment => entry_fee_payment.new._id.toString()) },
            barion_transaction_id: { $in: unique_barion_transaction_ids },
        }, { session: session })
        ) {
            if (!parent_session) {
                if (session.inTransaction()) await session.abortTransaction()
                await session.endSession()
            }
            return {
                code: 409,
                data: 'at_least_one_provided_barion_transaction_id_already_exists_in_db',
            }
        }
    }
    
    // pos_transaction_id and confirm_payment_id can not be updated (only deleted) so we don't have to check for uniqueness.

    // 10. Save updated documents
    await Entry_Fee_Payment_Model.bulkSave(entry_fee_payments.map(entry_fee_payment => entry_fee_payment.new), { session: session })

    // 11. Update dependents
    // Entry_Fee_Payment doesn't have dependents.

    // 12. Commit transaction and end session
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 13. Reply
    return {
        code: 200,
        data: undefined,
    }
}

module.exports = update