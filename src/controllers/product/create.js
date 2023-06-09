// COMPETITOR, SERVER
module.exports = async (body, user, parent_session) => {

    // 1. Validate body
    const create_product_validator = require('../../validators/requests/api/product/create')
    try {
        await create_product_validator.validateAsync(body)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Arrayize
    body = Array.isArray(body) ? body : [body]

    // 3. Authorize create
    const authorizer = require('../../authorizers/product')
    try {
        body = body.map((product) => authorizer(product, 'create', user))
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }

    // 4. Start session and transaction if they don't exist
    const Product_Model = require('../../models/Product')
    const session = parent_session ?? await Product_Model.db.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Create locally
    // Generate public_ids and secret_ids
    const randomstring = require('randomstring')
    const forbidden_id_parts = require('../../static/forbidden_id_parts')

    let existing_product
    let is_forbidden_part

    for (const product of body) {
        let public_id
        do {
            const letters = randomstring.generate({
                length: 3,
                charset: 'alphabetic',
                capitalization: 'lowercase',
            })
            const numbers = randomstring.generate({
                length: 3,
                charset: 'numeric',
            })
            public_id = `${letters}${numbers}`
            existing_product =
                (await Product_Model.exists({ public_id: public_id }, { session: session })) ||
                (await Product_Model.exists({ secret_id: public_id }, { session: session })) ||
                body.some((product) => product.public_id === public_id) ||
                body.some((product) => product.secret_id === public_id)

            is_forbidden_part = forbidden_id_parts.includes(letters)
        } while (existing_product || is_forbidden_part)
        product.public_id = public_id

        let secret_id
        do {
            const letters = randomstring.generate({
                length: 3,
                charset: 'alphabetic',
                capitalization: 'lowercase',
            })
            const numbers = randomstring.generate({
                length: 3,
                charset: 'numeric',
            })
            secret_id = `${letters}${numbers}`
            existing_product =
                (await Product_Model.exists({ public_id: secret_id }, { session: session })) ||
                (await Product_Model.exists({ secret_id: secret_id }, { session: session })) ||
                body.some((product) => product.secret_id === secret_id) ||
                body.some((product) => product.public_id === secret_id)

            is_forbidden_part = forbidden_id_parts.includes(letters)
        } while (existing_product || is_forbidden_part)
        product.secret_id = secret_id
    }

    // This is an interesting part. Because we can find out the approval state based on the competition and the user, this means
    // that we shouldn't even store it, because it is redundant. And using this anti-pattern (asking the 
    // competition and user controllers) is a very good indicator of the fact that we have redundant data.
    // But for now, this won't be changed.
    const find_competition = require('../competition/find')
    const find_user = require('../user/find')
    const competitions_of_products = (await find_competition(
        { _id: { $in: body.map(product => product.competition_id.toString()) } },
        { role: 'SERVER' },
        session
    ))?.data ?? []
    const users_of_products = (await find_user(
        { _id: { $in: body.map(product => product.competitor_id.toString()) } },
        { role: 'SERVER' },
        session
    ))?.data ?? []

    for (const product of body) {
        const competition_of_product = competitions_of_products.find(competition => competition._id.toString() === product.competition_id.toString())
        const user_of_product = users_of_products.find(user => user._id.toString() === product.competitor_id.toString())
        if (!competition_of_product || !user_of_product) continue;
        if (competition_of_product.payment_needed) {
            if (
                !competition_of_product.association_members_need_to_pay &&
                user_of_product.association_member
            ) {
                product.approved = true
                product.approval_type = 'association_member'
            }
        } else {
            product.approved = true
            product.approval_type = 'bypass'
        }
    }

    const _products = body.map((product) => ({
        competition_id: product.competition_id, // required
        competitor_id: product.competitor_id, // required
        public_id: product.public_id, // GENERATED
        secret_id: product.secret_id, // GENERATED
        product_name: product.product_name, // required
        ...(product.anonimized_product_name && { // optional
            anonimized_product_name: product.anonimized_product_name, // optional
        }),
        factory_name: product.factory_name, // required
        maturation_time_type: product.maturation_time_type, // required
        ...(product.maturation_time_type === 'matured' && { // required
            maturation_time_quantity: product.maturation_time_quantity, // required
        }),
        ...(product.maturation_time_type === 'matured' && { // required
            maturation_time_unit: product.maturation_time_unit, // required
        }),
        milk_type: product.milk_type, // required
        product_category_id: product.product_category_id, // required
        product_description: product.product_description, // required
        ...(product.anonimized_product_description && { // optional
            anonimized_product_description: // optional
                product.anonimized_product_description, // optional
        }),
        ...(product.approved && { approved: product.approved }), // GENERATED
        ...(product.approved && { approval_type: product.approval_type }), // GENERATED
        ...(product.handed_in && { handed_in: product.handed_in }), // optional
    }))

    const products = _products.map((product) => new Product_Model(product))

    // 6. Validate created documents
    const product_validator = require('../../validators/schemas/Product')
    try {
        const validator_promises = products.map((product) =>
            product_validator.validateAsync(product)
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
    const dependencies = ['user', 'competition']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/product`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(products.map(product => ({ old: null, new: product })), user, session))
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

    // 8. Check local constraints and collection integrity
    // public_id and secret_id should be unique, but it is checked at creation.
    // milk_type should be valid, but it is for a later concern
    // product_category_id should be valid, but it is asked at competition/approve_dependent_mutation/product
    // an unapproved product cannot be handed in: this should be checked at document validation

    // 9. Save created documents
    await Product_Model.bulkSave(products, { session: session })

    // 10. Update dependents
    // Nothing needs to be updated.

    // 11. Commit transaction and end session.
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 12. Reply
    return {
        code: 201,
        data: undefined, // TODO: check if it works if i leave it out, etc.
    }
}