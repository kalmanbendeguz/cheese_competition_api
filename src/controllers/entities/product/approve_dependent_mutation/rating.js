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

    // 4. Based on Product's dependencies, is this mutation possible?
    // The dependencies will only see that Product has changed, they won't know anything about Rating.
    const dependencies = ['competition', 'user']
    const dependency_approvers = dependencies.map(dependency => require(`../../${dependency}/approve_dependent_mutation/product`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(
            dependency_approver(
                products.map(product => ({ old: product, new: product })),
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