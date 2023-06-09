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


    



    // 3. prepare find
    // C, O, R, S
    const filter = data.query
    if (user.role === 'competitor') {
        filter.competitor_id = user._id
    }

    // 4. find
    const products = await Product_Model.find(filter)
    if (products.length === 0)
        return {
            code: 404,
            data: 'no_documents_found_to_update',
        }

    // 5. check dependencies : does anything prevent to do this update?
    // after this: we should check dependents. by this i mean: try a single-operation update of dependents
    // if it fails: it will return the reason of failing. we will return with that :)
    // FIELD FIRST APPROACH !!! for update, this is the best. for others, not so sure.
    // after fields -> ROLES.
    if ('product_name' in data.body ||
        'factory_name' in data.body ||
        'maturation_time_type' in data.body ||
        'maturation_time_quantity' in data.body ||
        'maturation_time_unit' in data.body ||
        'milk_type' in data.body ||
        'product_category_id' in data.body ||
        'product_description' in data.body) {
        // Server and organizer korlátlanul módosíthatják ezeket.
        // competitor csak akkor, ha entry opened, és még nem lett átvéve a termék.
    }
    // left: anonimized_product_name, anonimized_product_description, approved, approval_type, handed_in
    if ('anonimized_product_name' in data.body ||
        'anonimized_product_description' in data.body) {
        // server and organizer korlátlanul módosíthatják ezeket. senki más nem.
    }
    // left: approved, approval_type, handed_in
    if ('approved' in data.body || // we know that if approval_type is in data.body then approved is REQUIRED in data.body.
        'approval_type' in data.body) { // if approved is in data.body and FALSE, then approval_type is FORBIDDEN on data.body.
        // csak SERVER és ORGANIZER módosíthatja.
        // ((4*3)/2)*2 átmenet lehetőség. 4 = unapproved, paid, assmember, bypass.
        // if its paid: nobody can change this. maradt: 9 átmenet
        // you can not change approval type and you cant unaprove an approved product.
        // so only 3 transition is possible: unapp->bypass, unapp->payment, unapp->assmember.
        // 1. if unapp->bypass: entry should be opened.
        // 2. if unapp->payment: entry should be opened, payment should exist, ...
        // 3. if unapp-> assmember: !!
    }
    // product_name: for S and O: unlimited. for C: entry should be opened and product should not be handed in
    // anonimized_product_name: for S and O: unlimited
    // factory_name: for S and O: unlimited. for C: entry should be opened and product should not be handed in
    // mat_time_type, mat_time_qty, mat_time_unit, milk type, prod cat id, product description: for S and O: unlimited. for C: entry should be opened and product should not be handed in
    // anonimized_product_description: for S and O: unlimited
    // approved: for S and O: 




    // document consistency: it will be checked at validation, but some validation needs to be here:
    // check if product_category_id valid
    // if approval_type is 'payment', we need to check for the payment document to exist.
    // if a competitor wants to change anything, he only can do it if the entry is opened.
    // if a receiver wants to do a hand-in, he can do it even if the entry is opened/closed, competition is opened/closed. he can set handed-in to false as well.
    // but the competition should not be archived. if it is archived, a hand-in cannot happen.
    // a not-approved product cannot be handed in.

    // collection level consistency: nothing that can change needs to be unique.

    // 6. prepare_update
    const update = data.body // anonymous is OK, aspects is OK, overall impression is OK.
    const remove = [] // for rating nothing needs to be removed

    // 7. update
    for (const rating of ratings) {
        const current_update = structuredClone(update)
        let current_remove = structuredClone(remove)

        rating.set(current_update)

        for (const key of current_remove) {
            rating[key] = undefined
        }
    }

    // 8. validate documents
    const rating_validator = require('../../validators/schemas/Rating')
    try {
        const validator_promises = ratings.map((rating) =>
            rating_validator.validateAsync(rating)
        )
        await Promise.all(validator_promises)
    } catch (err) {
        return { code: 500, data: err.details }
    }

    // 9. update dependents
    // only dependent is: Rating_Picture. but that does not need to be updated
    // no dependent needs to be updated.

    // 10. save
    const saver_promises = ratings.map((rating) => rating.save())
    await Promise.all(saver_promises)

    // 11. reply
    return {
        code: 200,
        data: undefined,
    }
}

//// own model
    //const Product_Model = require('../../models/Product')
    //// dependency finds
    //const find_user = require('../user/find')
    //const find_competition = require('../competition/find')
    //// dependent mutations
    //// create
    //const create_rating = require('../rating/create')
    //const create_entry_fee_payment = require('../entry_fee_payment/create')
    //// update
    //const update_rating = require('../rating/update')
    //const update_entry_fee_payment = require('../entry_fee_payment/update')
    //// remove
    //const remove_rating = require('../rating/remove')
    //const remove_entry_fee_payment = require('../entry_fee_payment/remove')