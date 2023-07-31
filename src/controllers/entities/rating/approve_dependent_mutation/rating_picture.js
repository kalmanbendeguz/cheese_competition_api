const approve_rating_picture_mutation = async (rating_pictures, user, session) => {

    // 1. Detect action
    let action
    if(!Array.isArray(rating_pictures)) {
        return {
            approved: false,
            reason: 'provided_rating_pictures_is_not_an_array'
        }
    } else if (rating_pictures.length === 0) {
        return {
            approved: true,
            reason: null
        }
    } else if (!rating_pictures[0].old && !rating_pictures[0].new) {
        return {
            approved: false,
            reason: 'dependency_approver_got_both_states_null'
        }
    } else if (!rating_pictures[0].old && rating_pictures[0].new) {
        action = 'create'
    } else if (!rating_pictures[0].old && rating_pictures[0].new) {
        action = 'remove'
    } else if (rating_pictures[0].old && rating_pictures[0].new) {
        action = 'update'
    } else {
        return {
            approved: false,
            reason: 'dependency_approver_unknown_error'
        }
    }

    // 2. We need to query the owner Rating documents into an array
    // Projection should contain the _id, and the fields that are needed to check if Rating_Picture mutation is allowed.
    const rating_ids = action === 'create' ? 
        rating_pictures.map(rating_picture => rating_picture.new.rating_id.toString())
        :
        rating_pictures.map(rating_picture => rating_picture.old.rating_id.toString())
    const unique_rating_ids = [...new Set(rating_ids)]

    const find_rating = require('../find')
    const ratings = (await find_rating(
        {
            filter: {
                _id: { $in: unique_rating_ids },
            },
            projection: {
                _id: 1
            }
        },
        { role: 'SERVER' },
        session
    ))?.data ?? []

    // 3. Based only on Rating, is this mutation possible?
    // All provided rating_ids should belong to a real Rating.
    if(unique_rating_ids.length !== ratings.length){
        return {
            approved: false,
            reason: 'not_all_provided_rating_ids_belong_to_a_real_rating'
        }
    }

    // Note: It is a design problem that because Rating_Picture's only dependency is Rating,
    // we can't implement the table_leader check, because if here we ask the User (one of the next dependencies in the graph)
    // then the User 'approve_rating_mutation' won't see that a Rating_Picture changed, it will only see Rating.

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

module.exports = approve_rating_picture_mutation