// ORGANIZER, SERVER
module.exports = async (query, user) => {
    const Competition_Model = require('../../models/Competition')
    const Product_Model = require('../../models/Product')
    const Rating_Model = require('../../models/Rating')
    const remove_rating_picture = require('../rating_picture/remove')

    // 1. validate query
    const remove_rating_validator = require('../../validators/requests/api/rating/remove')
    try {
        await remove_rating_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. authorize {query, user}
    const authorizer = require('../../authorizers/rating')
    const authorizer_result = authorizer(query, 'remove', user)
    if (!authorizer_result.authorized) {
        return { code: 403, data: authorizer_result.message }
    }

    // 3. prepare find
    const filter = query

    // 4. find
    const ratings = await Rating_Model.find(filter)
    if (ratings.length === 0)
        return {
            code: 404,
            data: 'no_documents_found_to_remove',
        }

    // 5. check dependencies: is there anything that prevents this remove?
    // Rating_Picture: no. Rating: no. Product: no. Competition: it should be opened.
    // rating -> product -> competition.
    // this can be refactored using unique_product_ids and unique_competition_ids
    for (const rating of ratings) {
        const product_of_rating = await Product_Model.findById(
            rating.product_id
        )
        const competition_of_product = await Competition_Model.findById(
            product_of_rating.competition_id
        )
        if (!competition_of_product.competition_opened)
            return {
                code: 403,
                data: 'can_not_remove_a_rating_which_belongs_to_a_closed_competition',
            }
    }

    // 6. update dependents: CHECK IF THIS OPERATION SUCCEEDS?
    // remove all rating_pictures of all ratings
    const remove_rating_picture_promises = ratings.map((rating) =>
        remove_rating_picture(
            {
                rating_id: rating._id.toString(),
            },
            {
                role: 'SERVER',
            }
        )
    )
    await Promise.all(remove_rating_picture_promises)

    // 7. remove
    const ids_to_delete = ratings.map((rating) => rating._id)
    await Rating_Model.deleteMany({
        _id: { $in: ids_to_delete },
    })

    // 8. reply
    return {
        code: 200,
        data: undefined,
    }
}
