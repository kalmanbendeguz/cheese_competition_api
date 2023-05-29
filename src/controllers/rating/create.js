// Judge, Server
module.exports = async (body, user) => {
    const Rating_Model = require('../../models/Rating')
    const User_Model = require('../../models/User')
    const Competition_Model = require('../../models/Competition')
    const Product_Model = require('../../models/Product')

    // 1. validate body
    const create_rating_validator = require('../../validators/requests/api/rating/create')
    try { await create_rating_validator.validateAsync(body) }
    catch (err) { return { code: 400, data: err.details } }

    // 2. arrayize
    body = Array.isArray(body) ? body : [body]

    // 3. authorize {body, user}
    const authorizer = require('../../authorizers/rating')
    const authorizer_results = body.map(rating => authorizer(rating, 'create', user))
    const violation = authorizer_results.find(result => !result.authorized)
    if (violation) { return { code: 403, data: violation.message } }

    // 4. check_dependencies: is there anything that prevents creation?
    // we need compound uniqueness of {product_id, judge_id}
    for (const rating of body) {
        if (await Rating_Model.exists({
            product_id: rating.product_id,
            judge_id: rating.judge_id
        })) return {
            code: 409,
            data: 'product_id_and_judge_id_should_be_compound_unique'
        }
    }

    // all products should exist and be approved and handed in
    const unique_product_ids = [...new Set(body.map(rating => rating.product_id.toString()))]
    if ((await Product_Model.countDocuments({
        _id: { $in: unique_product_ids },
        approved: true,
        handed_in: true
    })) !== unique_product_ids.length) return {
        code: 403,
        data: 'one_or_more_provided_products_are_not_existing_or_not_approved_or_not_handed_in'
    }

    // all users should be activated judges, and they should be arrived to this competition.
    for (const rating of body) {
        const competition_id = (await Product_Model.findById(rating.product_id)).competition_id
        if (!(await User_Model.exists({
            _id: rating.judge_id,
            roles: { $in: ['judge'] },
            registration_temporary: false,
            arrived: { $in: [competition_id] },
        }))) return {
            code: 403,
            data: 'at_least_one_provided_user_does_not_exist_or_not_a_judge_or_registration_temporay_or_not_arrived_to_provided_competition'
        }
    }

    // competitions should be existing and opened.
    const products = await Product_Model.find({ _id: { $in: unique_product_ids } }, ['_id', 'product_category_id'], { lean: true })
    const unique_competition_ids = [...new Set(products.map(product => product.competition_id.toString()))]
    if ((await Competition_Model.countDocuments({
        _id: { $in: unique_competition_ids },
        competition_opened: true
    })) !== unique_competition_ids.length) return {
        code: 403,
        data: 'one_or_more_provided_competitions_are_not_existing_or_not_opened'
    }

    // we need to check aspects's integrity 
    const rating_sheet_of_category_id = require('../../helpers/rating_sheet_of_category_id')
    const rating_satisfies_sheet = require('../../helpers/rating_satisfies_sheet')
    for (const rating of body) {
        const product_of_rating = products.find(product => product._id.toString() === rating.product_id)
        const rating_sheet = rating_sheet_of_category_id(product_of_rating.product_category_id)
        if (!rating_satisfies_sheet(rating, rating_sheet)) return {
            code: 403,
            data: 'rating_aspects_invalid'
        }
    }

    // 5. prepare
    // product_ids are required and checked
    // judge_ids are required and checked
    // anonymous is optional, default will be false
    // aspects are required and checked
    // overall impression is required and checked

    const _ratings = body.map(rating => ({
        product_id: rating.product_id,
        judge_id: rating.judge_id,
        ...((typeof rating.anonymous !== 'undefined') && { anonymous: rating.anonymous }), // default: false
        aspects: rating.aspects,
        overall_impression: rating.overall_impression,
    }))

    // 6. create
    const ratings = _ratings.map(rating => new Rating_Model(rating))

    // 7. validate_documents
    const rating_validator = require('../../validators/schemas/Rating')
    try {
        const validator_promises = ratings.map(rating => rating_validator.validateAsync(rating))
        await Promise.all(validator_promises)
    } catch (err) { return { code: 400, data: err.details } }

    // 8. update_dependents
    // nothing needs to be updated

    // 9. save
    const saver_promises = ratings.map(rating => rating.save())
    await Promise.all(saver_promises)

    // 10. reply
    return {
        code: 201,
        data: undefined // TODO, check if it works if i leave it out, etc.
    }
}