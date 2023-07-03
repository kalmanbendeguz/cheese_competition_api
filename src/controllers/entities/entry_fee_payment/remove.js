const remove = async (query, user, parent_session) => {

    // 1. Validate query
    const remove_entry_fee_payment_validator = require('../../../validators/requests/api/entry_fee_payment/remove')
    try {
        await remove_entry_fee_payment_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize remove
    const authorizer = require('../../../authorizers/entities/entry_fee_payment')
    try {
        query = authorizer(query, 'remove', user)
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }

    // 3. Start session and transaction if they don't exist
    const Entry_Fee_Payment_Model = require('../../../models/Entry_Fee_Payment')
    const session = parent_session ?? await Entry_Fee_Payment_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 4. Find
    const filter = query
    const entry_fee_payments = await Entry_Fee_Payment_Model.find(filter, null, { session: session })
    if (entry_fee_payments.length === 0) {
        if (!parent_session) {
            if (session.inTransaction()) await session.commitTransaction()
            await session.endSession()
        }
        return {
            code: 200,
            data: 'no_documents_found_to_remove',
        }
    }

    // 5. Validate documents
    const entry_fee_payment_validator = require('../../../validators/schemas/Entry_Fee_Payment')
    try {
        const validator_promises = entry_fee_payments.map(
            (entry_fee_payment) => entry_fee_payment_validator.validateAsync(entry_fee_payment)
        )
        await Promise.all(validator_promises)
    } catch (err) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return { code: 500, data: err.details }
    }

    // 6. Check dependencies: Ask all dependencies if this remove is possible.
    const dependencies = ['product']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/entry_fee_payment`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(entry_fee_payments.map(entry_fee_payment => ({ old: entry_fee_payment, new: null })), user, session))
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

    // 7. Check collection integrity
    // Nothing needs to be checked.

    // 8. Remove documents
    const ids_to_delete = entry_fee_payments.map((entry_fee_payment) => entry_fee_payment._id)
    await Entry_Fee_Payment_Model.deleteMany({
        _id: { $in: ids_to_delete },
    }, {
        session: session
    })

    // 9. Update dependents
    // Entry_Fee_Payment has no dependents.

    // 10. Commit transaction and end session
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 11. Reply
    return {
        code: 200,
        data: undefined,
    }
}

module.exports = remove