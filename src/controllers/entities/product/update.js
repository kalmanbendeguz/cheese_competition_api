const update = async (data, actor, parent_session) => {

    // 1. Validate data
    const update_product_validator = require('../../../validators/requests/api/product/update')
    try {
        await update_product_validator.validateAsync(data)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize updatable
    const authorizer = require('../../../authorizers/entities/product')
    try {
        data.query = authorizer(data.query, 'updatable', actor)
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }
    const filter = data.query

    // 3. Authorize update
    try {
        data.body = authorizer(data.body, 'update', actor)
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }
    const update = data.body

    // 4. Start session and transaction if they don't exist
    const Product_Model = require('../../../models/Product')
    const session = parent_session ?? await Product_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Find
    const product = (await Product_Model.findOne(
        filter,
        null,
        { session: session }
    ))

    if (!product) {
        if (!parent_session) {
            if (session.inTransaction()) await session.commitTransaction()
            await session.endSession()
        }
        return {
            code: 200,
            data: 'no_document_found_to_update',
        }
    }



    ////////////////////////////////
    // Check dependencies
    // if we only update one:
    is_competition_exist()
    is_product_category_id_ok()
    is_payment_conforming_with_competition_rule()
    is_association_member_conforming_with_competition_rule()
    if (actor.role === 'competitor') {
        is_entry_opened()
        is_competition_closed()
    } else if (actor.role === 'receiver') {
        is_competition_not_archived()
    }

    ////////////////////////////////



    // 6. Update locally
    // We need to go in a topological order.
    // For every field, we deal with the field and its dependencies, but not its dependents.

    const current_update = structuredClone(update)
    let current_remove = structuredClone(remove)

    // competition_id, competitor_id, public_id and secret_id cannot be changed
    // product_name, anonimized_product_name, factory_name and maturation_time_type is OK.

    // maturation_time_quantity
    if (
        'maturation_time_type' in current_update &&
        product.maturation_time_type === 'matured' &&
        current_update.maturation_time_type === 'fresh'
    ) {
        current_remove = current_remove.concat([
            'maturation_time_quantity'
        ])
    }

    // maturation_time_unit
    if (
        'maturation_time_type' in current_update &&
        product.maturation_time_type === 'matured' &&
        current_update.maturation_time_type === 'fresh'
    ) {
        current_remove = current_remove.concat([
            'maturation_time_unit'
        ])
    }

    // milk_type, product_category_id, product_description, anonimized_product_description and approved is OK.

    // approval_type
    if (
        'approved' in current_update &&
        product.approved === true &&
        current_update.approved === false
    ) {
        current_remove = current_remove.concat([
            'approval_type',
        ])
    }

    // handed_in is OK.

    product.set(current_update)
    for (const key of current_remove) {
        product[key] = undefined
    }

    // 7. Validate new documents
    const product_validator = require('../../../validators/schemas/Product')
    try {
        await product_validator.validateAsync(product)
    } catch (err) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return { code: 500, data: err.details }
    }

    // 8. Check dependencies: Ask all dependencies if this update is possible.
    const dependencies = ['user', 'competition']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/product`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(products, actor, session))
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
    // Nothing needs to be checked.

    // 10. Save updated documents
    await Product_Model.bulkSave(products.map(product => product.new), { session: session })

    // 11. Update dependents
    // Dependents are: Rating, Entry_Fee_Payment

    // Import dependent mutation controllers
    const remove_rating = require('../rating/remove')
    const remove_entry_fee_payment = require('../entry_fee_payment/remove')

    const update_dependent_promises = []

    for (const product of products) {
        // If we change the category, then all belonging Ratings should be removed.
        // We can only reach this code if Competition allowed this modification.
        if (product.old.product_category_id !== product.new.product_category_id) {
            // Maybe it will be denied, but thats OK.
            update_dependent_promises.push(remove_rating(
                {
                    product_id: product.old._id.toString(),
                },
                actor,
                session
            ))
        }

        // If the approval_type is changed from 'payment' to anything else, then the entry_fee_payment should be removed.
        if (product.old.approval_type === 'payment' && product.new.approval_type !== 'payment') {
            // He will be unauthorized, but thats OK.
            update_dependent_promises.push(remove_entry_fee_payment(
                {
                    product_ids: { $in: [product.old._id.toString()] },
                },
                actor,
                session
            ))
        }
    }

    const update_dependent_results = await Promise.all(update_dependent_promises)
    const failed_operation = update_dependent_results.find(result =>
        !(typeof result.code === 'number' && result.code >= 200 && result.code <= 299)
    )

    if (failed_operation) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return failed_operation
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

module.exports = update