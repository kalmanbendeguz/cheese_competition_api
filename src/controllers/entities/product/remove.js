const remove = async (query, user, parent_session) => {

    // 1. Validate query
    const remove_product_validator = require('../../../validators/requests/api/product/remove')
    try {
        await remove_product_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize remove
    const authorizer = require('../../../authorizers/entities/product')
    try {
        query = authorizer(query, 'remove', user)
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }

    // 3. Start session and transaction if they don't exist
    const Product_Model = require('../../../models/Product')
    const session = parent_session ?? await Product_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 4. Find
    const filter = query
    const products = await Product_Model.find(filter, null, { session: session })
    if (products.length === 0) {
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
    const product_validator = require('../../../validators/schemas/Product')
    try {
        const validator_promises = products.map(
            (product) => product_validator.validateAsync(product)
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
    const dependencies = ['user', 'competition']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/product`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(products.map(product => ({ old: product, new: null })), user, session))
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
    const ids_to_delete = products.map((product) => product._id)
    await Product_Model.deleteMany({
        _id: { $in: ids_to_delete },
    }, {
        session: session
    })

    // 9. Update dependents
    // Dependents are: Rating, Entry_Fee_Payment
    // Import dependent mutation controllers
    // create
    // No 'create' dependent controller needs to be imported
    // find
    // No 'find' dependent controller needs to be imported
    // update
    // No 'update' dependent controller needs to be imported
    // remove
    const remove_entry_fee_payment = require('../entry_fee_payment/remove')
    const remove_rating = require('../rating/remove')

    const update_dependent_promises = []

    for (const product of products) {
        update_dependent_promises.push(remove_entry_fee_payment( // he will be unauthorized, but thats ok.
            {
                product_ids: { $in: [product._id.toString()] },
            },
            user,
            session
        ))
        update_dependent_promises.push(remove_rating(
            {
                product_id: product._id.toString(),
            },
            user,
            session
        ))
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
        return failed_operation // EXAMPLE: {code: 403, data: 'can_not_remove_a_rating_which_belongs_to_a_closed_competition'}
    }

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