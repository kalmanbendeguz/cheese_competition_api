const approve_product_mutation = async (products, user, session) => {

    // 1. Detect action
    let action
    if (!Array.isArray(products)) {
        return {
            approved: false,
            reason: 'provided_products_is_not_an_array'
        }
    } else if (products.length === 0) {
        return {
            approved: true,
            reason: null
        }
    } else if (!products[0].old && !products[0].new) {
        return {
            approved: false,
            reason: 'dependency_approver_got_both_states_null'
        }
    } else if (!products[0].old && products[0].new) {
        action = 'create'
    } else if (!products[0].old && products[0].new) {
        action = 'remove'
    } else if (products[0].old && products[0].new) {
        action = 'update'
    } else {
        return {
            approved: false,
            reason: 'dependency_approver_unknown_error'
        }
    }

    // 2. We need to query the owner User documents into an array
    // Projection should contain the _id, and the fields that are needed to check if Product mutation is allowed.
    const user_ids = action === 'create' ?
        products.map(product => product.new.competitor_id.toString())
        :
        products.map(product => product.old.competitor_id.toString())
    const unique_user_ids = [...new Set(user_ids)]

    const find_user = require('../find')
    const users = (await find_user(
        {
            filter: {
                _id: { $in: unique_user_ids },
                roles: { $in: ['competitor'] }
            },
            projection: {
                _id: 1,
                association_member: 1
                // Check if anything else needed!
            }
        },
        { role: 'SERVER' },
        session
    ))?.data ?? []

    // 3. Based only on User, is this mutation possible?
    // If action is not 'remove', all provided competitor_ids should belong to a real Competitor.
    if (action !== 'remove' && unique_user_ids.length !== users.length) {
        return {
            approved: false,
            reason: 'not_all_provided_competitor_ids_belong_to_a_real_competitor'
        }
    }

    // If we change the approval_type to "association_member", then the owner User should be association_member=true
    for (const product of products) {
        if ((product.old?.approval_type ?? null !== 'association_member') && (product.new?.approval_type ?? null === 'association_member')) {
            // For later: it might be a better way to just put the owner User into a variable, for further checks.
            if (!users.some(u => u._id.toString() === product.new.competitor_id.toString() && (u.association_member ?? false === true))) {
                return {
                    approved: false,
                    reason: 'not_possible_to_change_approval_type_to_association_member_because_owner_competitor_is_not_association_member'
                }
            }
        }
    }

    // 4. Based on User's dependencies, is this mutation possible?
    // The dependencies will only see that User has changed, they won't know anything about Product.
    const dependencies = ['allowed_role', 'competition']
    const dependency_approvers = dependencies.map(dependency => require(`../../${dependency}/approve_dependent_mutation/user`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(
            dependency_approver(
                users.map(u => ({ old: u, new: u })),
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

module.exports = approve_product_mutation