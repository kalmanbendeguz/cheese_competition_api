module.exports = async (body, user) => {
    const User_Model = require('../../models/User')
    const Competition_Model = require('../../models/Competition')
    const Product_Model = require('../../models/Product')

    // 1. validate body
    const create_product_validator = require('../../validators/requests/api/product/create')
    try { await create_product_validator.validateAsync(body) }
    catch (err) { return { code: 400, data: err.details } }

    // 2. arrayize
    body = Array.isArray(body) ? body : [body]

    // 3. authorize {body, user}
    const authorizer = require('../../authorizers/product')
    const authorizer_results = body.map(product => authorizer(product, 'create', user))
    const violation = authorizer_results.find(result => !result.authorized)
    if (violation) { return { code: 403, data: violation.message } }

    // 4. check_dependencies
    // are all competitions exists and opened?
    const unique_competition_ids = [...new Set(body.map(product => product.competition_id.toString()))]
    
    if ((await Competition_Model.countDocuments({
        _id: { $in: unique_competition_ids },
        entry_opened: true
    })) !== unique_competition_ids.length) return {
        code: 403,
        data: 'one_or_more_provided_competitions_are_not_existing_or_not_opened'
    }

    // if the user is SERVER, are all competitors actually competitors and are they activated users?
    const unique_user_ids = [...new Set(body.map(product => product.competitor_id.toString()))]
    if (user.role === 'SERVER') {
        if ((await User_Model.countDocuments({
            _id: { $in: unique_user_ids },
            roles: { $in: ['competitor'] },
            registration_temporary: false
        })) !== unique_user_ids.length) return {
            code: 403,
            data: 'one_or_more_provided_competitor_ids_are_not_existing_or_not_competitors_or_not_activated'
        }
    }

    // 5. prepare
    // competition_ids are required and checked
    // competitor_ids are required if server, set here if competitor
    if (user.role === 'competitor') {
        for (let product of body) {
            product.competitor_id = user._id
        }
    }

    // public_ids and secret_ids
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
                capitalization: 'lowercase'
            })
            const numbers = randomstring.generate({
                length: 3,
                charset: 'numeric',
            })
            public_id = `${letters}${numbers}`
            existing_product = await Product_Model.exists({ 'public_id': public_id })
                || await Product_Model.exists({ 'secret_id': public_id })
                || body.some(product => product.public_id === public_id)

            is_forbidden_part = forbidden_id_parts.includes(letters)

        } while (existing_product || is_forbidden_part)
        product.public_id = public_id

        let secret_id
        do {
            const letters = randomstring.generate({
                length: 3,
                charset: 'alphabetic',
                capitalization: 'lowercase'
            })
            const numbers = randomstring.generate({
                length: 3,
                charset: 'numeric',
            })
            secret_id = `${letters}${numbers}`
            existing_product = await Product_Model.exists({ 'public_id': secret_id })
                || await Product_Model.exists({ 'secret_id': secret_id })
                || body.some(product => product.secret_id === secret_id)

            is_forbidden_part = forbidden_id_parts.includes(letters)

        } while (existing_product || is_forbidden_part)
        product.secret_id = secret_id
    }

    // product_name, anonimized_product_name, factory_name, maturation_time_type, maturation_time_quantity,
    // maturation_time_unit, milk_type, product_category_list, product_description, and
    // anonimized_product_description are required or optional

    // approved and approval type.
    // for each product: if competition.payment_needed, then check for ass members.
    //                   else approve -> bypass.   
    const competitions = await Competition_Model.find(
        { _id: { $in: unique_competition_ids } },
        ['_id', 'association_members_need_to_pay'],
        { lean: true }
    )
    const users = await User_Model.find(
        { _id: { $in: unique_user_ids } },
        ['_id', 'association_member'],
        { lean: true }
    )
    for (let product of body) {
        const competition = competitions.find(competition => competition._id = product.competition_id)
        const user = users.find(user => user._id = product.competitor_id)
        if(competition.payment_needed){
            if(!competition.association_members_need_to_pay && user.association_member){
                product.approved = true
                product.approval_type = 'association_member'
            }
        } else {
            product.approved = true
            product.approval_type = 'bypass'
        }
    }

    const _products = body.map(product => ({
        competition_id: product.competition_id,
        competitor_id: product.competitor_id,
        public_id: product.public_id,
        secret_id: product.secret_id,
        product_name: product.product_name,
        ...(product.anonimized_product_name && { anonimized_product_name: product.anonimized_product_name }),
        factory_name: product.factory_name,
        maturation_time_type: product.maturation_time_type,
        ...(product.maturation_time_type === 'matured' && { maturation_time_quantity: product.maturation_time_quantity }),
        ...(product.maturation_time_type === 'matured' && { maturation_time_unit: product.maturation_time_unit }),
        milk_type: product.milk_type,
        product_category_list: product.product_category_list,
        product_description: product.product_description,
        ...(product.anonimized_product_description && { anonimized_product_description: product.anonimized_product_description }),
        ...(product.approved && { approved: product.approved }),
        ...(product.approved && { approval_type: product.approval_type }),
        ...(product.handed_in && { handed_in: product.handed_in }),
    }))

    // 6. create
    const products = _products.map(product => new Product_Model(product))

    // 7. validate_documents
    const product_validator = require('../../validators/schemas/Product')
    try {
        const validator_promises = products.map(product => product_validator.validateAsync(product))
        await Promise.all(validator_promises)
    } catch (err) { return { code: 400, data: err.details } }

    // 8. update_dependencies
    // nothing needs to be updated

    // 9. save
    const saver_promises = products.map(product => product.save())
    await Promise.all(saver_promises)

    // 10. reply
    return {
        code: 201,
        data: undefined // TODO, check if it works if i leave it out, etc.
    }
}