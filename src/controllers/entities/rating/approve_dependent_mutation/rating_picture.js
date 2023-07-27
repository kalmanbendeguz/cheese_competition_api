const approve_rating_picture_mutation = async (rating_pictures, user, session) => {

    // 1. We need to query the owner Rating documents into an array
    // Projection should contain the _id, and the fields that are needed to check if Rating_Picture mutation is allowed.
    const find_rating = require('../find')
    const ratings = (await find_rating(
        {
            filter: {
                _id: { $in: rating_pictures.map(rating_picture => rating_picture.rating_id.toString()) },
            },
            projection: {
                _id: 1
            }
        },
        { role: 'SERVER' },
        session
    ))?.data ?? []

    // 2. Based only on Rating, is this mutation possible?
    // Yes, Rating's state doesn't forbid the mutation of a Rating_Picture.

    // 3. Based on Rating's dependencies, is this mutation possible?
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

    return {
        approved: true,
        reason: null
    }
}

module.exports = approve_rating_picture_mutation