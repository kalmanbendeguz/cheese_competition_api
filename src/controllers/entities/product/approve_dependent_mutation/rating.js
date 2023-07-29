const approve_rating_mutation = async (ratings, user, session) => {

    // 1. Detect action
    let action
    if (!Array.isArray(ratings)) {
        return {
            approved: false,
            reason: 'provided_ratings_is_not_an_array'
        }
    } else if (ratings.length === 0) {
        return {
            approved: true,
            reason: null
        }
    } else if (!ratings[0].old && !ratings[0].new) {
        return {
            approved: false,
            reason: 'dependency_approver_got_both_states_null'
        }
    } else if (!ratings[0].old && ratings[0].new) {
        action = 'create'
    } else if (!ratings[0].old && ratings[0].new) {
        action = 'remove'
    } else if (ratings[0].old && ratings[0].new) {
        action = 'update'
    } else {
        return {
            approved: false,
            reason: 'dependency_approver_unknown_error'
        }
    }

    // 2. We need to query the owner Product documents into an array
    // Projection should contain the _id, and the fields that are needed to check if Rating mutation is allowed.
    const product_ids = action === 'create' ?
        ratings.map(rating => rating.new.product_id.toString())
        :
        ratings.map(rating => rating.old.product_id.toString())
    const unique_product_ids = [...new Set(product_ids)]

    const find_product = require('../find')
    const products = (await find_product(
        {
            filter: {
                _id: { $in: unique_product_ids },
            },
            projection: {
                _id: 1
            }
        },
        { role: 'SERVER' },
        session
    ))?.data ?? []

    // 3. Based only on Product, is this mutation possible?
    // All provided product_ids should belong to a real Product.
    if (unique_product_ids.length !== products.length) {
        return {
            approved: false,
            reason: 'not_all_provided_product_ids_belong_to_a_real_product'
        }
    }
    
    const rating_satisfies_sheet = require('../../../../helpers/rating_satisfies_sheet')
    const rating_sheet_of_category_id = require('../../../../helpers/rating_sheet_of_category_id')
    for (const rating of ratings) {
        const product_of_rating = products.find(product => product._id.toString() === rating.new.product_id.toString())

        // We should check if Rating's "aspects" satisfies the rating sheet.
        const rating_sheet_of_product_category = rating_sheet_of_category_id(product_of_rating.product_category_id)
        if (!rating_satisfies_sheet(rating.new.aspects, rating_sheet_of_product_category)) {
            return {
                approved: false,
                reason: 'rating_aspects_does_not_satisfy_the_rating_sheet_of_the_product_category'
            }
        }

        // Product should be approved
        if (!product_of_rating.approved) {
            return {
                approved: false,
                reason: 'product_should_be_approved_to_mutate_rating'
            }
        }

        // Product should be handed_in
        if (!product_of_rating.handed_in) {
            return {
                approved: false,
                reason: 'product_should_be_handed_in_to_mutate_rating'
            }
        }
    }

    // 4. Based on Rating's dependencies, is this mutation possible?
    // The dependencies will only see that Rating has changed, they won't know anything about Rating_Picture.
    const dependencies = ['product', 'user']
    const dependency_approvers = dependencies.map(dependency => require(`../../${dependency}/approve_dependent_mutation/rating`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(
            dependency_approver(
                ratings.map(rating => ({ old: rating, new: rating })),
                user,
                session
            )
        )
    }
    const dependency_approver_results = await Promise.all(dependency_approver_promises)

    const unapproved = dependency_approver_results.find(dependency_approver_result => !dependency_approver_result.approved)
    if (unapproved) {
        return unapproved
    }

    // 5. Approve
    return {
        approved: true,
        reason: null
    }
}

module.exports = approve_rating_mutation
//
//module.exports = (old_state, new_state, user,session) => {
//    // this is associated with class PRODUCT
//
//    // user can be: JUDGE, ORGANIZER, SERVER
//
//    // productmodel
//    // user find controller
//    // competition find controller
//    // user.mutation_approver.product ?
//    // competition.mutation_approver.product ?
//    
//    // FOR EACH OPERATION, WE NEED TO USE THE SESSION
//    //
//
//    // detect action
//    let action
//    if (old_state === null && new_state !== null) action = 'create'
//    else if (old_state !== null && new_state !== null) action = 'update'
//    else if (old_state !== null && new_state === null) action = 'remove'
//    else return { approved: false, reason: 'dependent_mutation_approver_got_both_states_null' }
//
//    if (action === 'create') {
//        if (user.role === 'SERVER') {
//
//        } else return { approved: false, reason: 'unknown_user_role' }
//    } else if (action === 'update') {
//        if (user.role === 'judge') {
//
//        } else if (user.role === 'organizer') {
//
//        } else if (user.role === 'SERVER') {
//
//        } else return { approved: false, reason: 'unknown_user_role' }
//    } else if (action === 'remove') {
//        if (user.role === 'organizer') {
//
//        } else if (user.role === 'SERVER') {
//
//        } else return { approved: false, reason: 'unknown_user_role' }
//    } else return { approved: false, reason: 'unknown_action' }
//
//
//    // we should find the associated document: 
//    const ownerdoc = Product_Model.find(_id: old_or_new_state.product_id);
//
//    // if you want to change rating, you can do it only if competition is opened.
//    if (rating_wants_to_change) {
//        if (user == 'judge') {
//            const comp = competition_find_controller.find(_id: product.comp_id)
//            if (!comp.comp_opened) {
//                return {
//                    approved: false,
//                    reason: 'competition not opened :('
//                }
//            }
//        }
//    }
//}
//
//
//// (previous_state={null/prevstate}, new_state={null/newstate})
//// => 
//// {true, null} | {false,reason}
//
//// post     = prevstate = null,      newstate = newstate
//// put      = prevstate = prevstate, newstate = newstate
//// delete   = prevstate = prevstate, newstate = null
//
//// all products should exist and be approved and handed in
//const unique_product_ids = [
//    ...new Set(body.map((rating) => rating.product_id.toString())),
//]
//if (
//    (await Product_Model.countDocuments({
//        _id: { $in: unique_product_ids },
//        approved: true,
//        handed_in: true,
//    })) !== unique_product_ids.length
//)
//    return {
//        code: 403,
//        data: 'one_or_more_provided_products_are_not_existing_or_not_approved_or_not_handed_in',
//    }
//
//    // competitions should be existing and opened.
//    const products = await Product_Model.find(
//        { _id: { $in: unique_product_ids } },
//        ['_id', 'product_category_id'],
//        { lean: true }
//    )
//    const unique_competition_ids = [
//        ...new Set(
//            products.map((product) => product.competition_id.toString())
//        ),
//    ]
//    if (
//        (await Competition_Model.countDocuments({
//            _id: { $in: unique_competition_ids },
//            competition_opened: true,
//        })) !== unique_competition_ids.length
//    )
//        return {
//            code: 403,
//            data: 'one_or_more_provided_competitions_are_not_existing_or_not_opened',
//        }
//
//        // we need to check aspects's integrity
//    const rating_sheet_of_category_id = require('../../helpers/rating_sheet_of_category_id')
//    const rating_satisfies_sheet = require('../../helpers/rating_satisfies_sheet')
//    for (const rating of body) {
//        const product_of_rating = products.find(
//            (product) => product._id.toString() === rating.product_id
//        )
//        const rating_sheet = rating_sheet_of_category_id(
//            product_of_rating.product_category_id
//        )
//        if (!rating_satisfies_sheet(rating, rating_sheet))
//            return {
//                code: 403,
//                data: 'rating_aspects_invalid',
//            }
//    }