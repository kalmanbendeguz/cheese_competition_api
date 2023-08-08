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

    // 2. We need to query the owner User documents into an array
    // Projection should contain the _id, and the fields that are needed to check if Rating mutation is allowed.
    const user_ids = action === 'create' ?
        ratings.map(rating => rating.new.judge_id.toString())
        :
        ratings.map(rating => rating.old.judge_id.toString())
    const unique_user_ids = [...new Set(user_ids)]

    const find_user = require('../find')
    const users = (await find_user(
        {
            filter: {
                _id: { $in: unique_user_ids },
                roles: { $in: ['judge'] }
            },
            projection: {
                _id: 1,
                // Check if anything else needed!
            }
        },
        { role: 'SERVER' },
        session
    ))?.data ?? []

    // 3. Based only on User, is this mutation possible?
    // If action is not 'remove', all provided judge_ids should belong to a real Judge.
    if (action !== 'remove' && unique_user_ids.length !== users.length) {
        return {
            approved: false,
            reason: 'not_all_provided_judge_ids_belong_to_a_real_judge'
        }
    }

    // If a Judge mutates a Rating, check if he is arrived at the Rating's Product's Competition.
    // This cannot be done, because design failures.

    // 4. Based on User's dependencies, is this mutation possible?
    // The dependencies will only see that User has changed, they won't know anything about Rating.
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

module.exports = approve_rating_mutation