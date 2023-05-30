// JUDGE, ORGANIZER, SERVER
module.exports = async (query, user) => {
    const Rating_Model = require('../../models/Rating')

    // 1. validate query
    const find_rating_validator = require('../../validators/requests/api/rating/find')
    try {
        await find_rating_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. authorize {query.filter, user}
    const authorizer = require('../../authorizers/rating')
    const filter_authorizer_result = authorizer(query.filter, 'find', user)
    if (!filter_authorizer_result.authorized) {
        return { code: 403, data: filter_authorizer_result.message }
    }

    // 3. authorize {query.projection, user}
    const projection_authorizer_result = authorizer(
        query.projection,
        'project',
        user
    )
    if (!projection_authorizer_result.authorized) {
        return { code: 403, data: projection_authorizer_result.message }
    }

    // 3. prepare
    const filter = query.filter
    if (user.role === 'judge') {
        filter.judge_id = user._id
    }
    const projection = query.projection // if you pass an unknown value, it will ignore it
    const options = query.options // limit: validated, skip: validated, sort: what if you pass an unknown key?

    // 4. find
    const ratings = await Rating_Model.find(
        filter,
        projection, // is undefined okay? or should i convert to null
        options // is undefined okay? or should i convert to null
    )

    // 5. validate documents
    const rating_validator = require('../../validators/schemas/Rating')
    try {
        const validator_promises = ratings.map(
            (rating) =>
                rating_validator.validateAsync(
                    rating
                )
        )
        await Promise.all(validator_promises)
    } catch (err) {
        return { code: 500, data: err.details }
    }

    // 6. send
    return {
        code: 200,
        data: ratings,
    }
}
