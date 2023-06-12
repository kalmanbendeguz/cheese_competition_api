// COMPETITOR, ORGANIZER, RECEIVER, SERVER
module.exports = async (data, user, parent_session) => {

    // 1. Validate data
    const update_product_validator = require('../../validators/requests/api/product/update')
    try {
        await update_product_validator.validateAsync(data)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize updatable
    const authorizer = require('../../authorizers/product')
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
    const Product_Model = require('../../models/Product')
    const session = parent_session ?? await Product_Model.db.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Find
    const products = (await Product_Model.find(
        filter,
        null,
        { session: session }
    )).map(product => ({ old: structuredClone(product), new: product }))
    if (products.length === 0) {
        if (!parent_session) {
            if (session.inTransaction()) await session.commitTransaction()
            await session.endSession()
        }
        return {
            code: 200, // this will be 200. bc this is not an error.
            data: 'no_documents_found_to_update',
        }
    }

    // 6. Update locally
    // If something needs to be removed from the document, we need to declare it here.
    const remove = [] // Remove that is globally true for all documents
    for (const product of products) {
        const current_update = structuredClone(update)
        let current_remove = structuredClone(remove)

        // competition_id, competitor_id, public_id and secret_id cannot be changed
        // product_name, anonimized_product_name, factory_name is OK
        if (
            'maturation_time_type' in current_update &&
            product.old.maturation_time_type === 'matured' &&
            current_update.maturation_time_type === 'fresh'
        ) {
            current_remove = current_remove.concat([
                'maturation_time_quantity',
                'maturation_time_unit',
            ])
        }
        // milk_type, product_category_id, product_description, anonimized_product_description is OK
        if (
            'approved' in current_update &&
            product.old.approved &&
            !current_update.approved
        ) {
            current_remove = current_remove.concat([
                'approval_type',
            ])
        }
        // handed_in is OK

        product.new.set(current_update)
        for (const key of current_remove) {
            product.new[key] = undefined
        }
    }

    // 7. Validate new documents
    const product_validator = require('../../validators/schemas/Product')
    try {
        const validator_promises = products.map((product) =>
            product_validator.validateAsync(product.new)
        )
        await Promise.all(validator_promises)
    } catch (err) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return { code: 500, data: err.details }
    }

    // 8. Check dependencies: Ask all dependencies if this creation is possible.
    const dependencies = ['user', 'competition']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/product`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(products, user, session))
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
    // public_id and secret_id should be unique, but it is checked at creation.
    // milk_type should be valid, but it is for a later concern (at validation OR at approve dep mut.)
    // product_category_id should be valid, but it is asked at competition/approve_dependent_mutation/product
    // an unapproved product cannot be handed in: this should be checked at document validation

    // 10. Save updated documents
    await Product_Model.bulkSave(products.map(product => product.new), { session: session })

    // 11. Update dependents
    // Dependents are: Rating, Entry_Fee_Payment
    // A rating should not be updated.
    // If the approval_type is changed from 'payment' to anything else, then the entry_fee_payment should be removed.
    // Import dependent mutation controllers
    // create
    // No 'create' dependent controller needs to be imported
    // find
    // No 'find' dependent controller needs to be imported
    // update
    // No 'update' dependent controller needs to be imported
    // remove
    const remove_entry_fee_payment = require('../entry_fee_payment/remove')

    const update_dependent_promises = []

    for (const product of products) {
        if (product.old.approval_type === 'payment' && product.new.approval_type !== 'payment') {
            update_dependent_promises.push(remove_entry_fee_payment( // he will be unauthorized, but thats ok.
                {
                    product_ids: { $in: [product.old._id.toString()] },
                },
                user,
                session
            ))
        }
    }

    const update_dependent_results = await Promise.all(update_dependent_promises) // or allsettled?
    const failed_operation = update_dependent_results.find(result => ![200, 201].includes(result.code))

    if (failed_operation) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return failed_operation // EXAMPLE: {code: 403, data: 'can_not_remove_a_rating_which_belongs_to_a_closed_competition'}
    }

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