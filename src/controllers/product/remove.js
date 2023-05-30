// COMPETITOR, ORGANIZER, SERVER
module.exports = async (query, user) => {
    const Competition_Model = require('../../models/Competition')
    const Product_Model = require('../../models/Product')
    const remove_rating = require('../rating/remove')

    // 1. validate query
    const remove_product_validator = require('../../validators/requests/api/product/remove')
    try {
        await remove_product_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. authorize {query, user}
    const authorizer = require('../../authorizers/product')
    const authorizer_result = authorizer(query, 'remove', user)
    if (!authorizer_result.authorized) {
        return { code: 403, data: authorizer_result.message }
    }

    // 3. prepare find
    // a competitor can only query his products.
    const filter = query
    if (user.role === 'competitor') {
        filter.competitor_id = user._id
    }

    // 4. find
    const products = await Product_Model.find(filter)
    if (products.length === 0)
        return {
            code: 404,
            data: 'no_documents_found_to_remove',
        }

    // 5. check dependencies: is there anything that prevents this remove?

    // IMPORTANT: at competition.remove, we check for paid products, and based on that, we dont remove. but this is wrong approach.
    // INSTEAD, we should try to remove the dependent products ("update-dependencies"), and if that fails then we abort remoivng competitions.
    // !!!! ^
    // !!!! |
    // i mean, we SHOULD NOT check dependenTS, only check dependenCIES

    // it is not possible to remove paid products for ANYONE
    if (products.some(product => product.approved && product.approval_type === 'payment')) return {
        code: 403,
        data: 'not_allowed_to_remove_paid_product',
    }
    if (user.role === 'competitor') {

        // it is not possible to remove handed_in products for COMPETITOR
        if (products.some(product => product.handed_in)) return {
            code: 403,
            data: 'not_allowed_to_remove_handed_in_product_for_competitor',
        }

        // entry should be opened. for COMPETITOR
        // competititon should be closed for COMPETITOR
        const unique_competition_ids = [
            ...new Set(products.map((product) => product.competition_id.toString())),
        ]
        if (
            (await Competition_Model.countDocuments({
                _id: { $in: unique_competition_ids },
                entry_opened: true,
                competition_opened: false
            })) !== unique_competition_ids.length
        )
            return {
                code: 403,
                data: 'not_allowed_to_remove_product_for_competitor_if_entry_closed_or_competition_opened',
            }
    }

    // 6. update dependents: CHECK IF THIS OPERATION SUCCEEDS.
    // remove all ratings of all products
    const remove_rating_promises = products.map((product) =>
        remove_rating(
            {
                product_id: product._id.toString(),
            },
            {
                role: 'SERVER',
            }
        )
    )
    await Promise.all(remove_rating_promises)

    // 7. remove
    const ids_to_delete = products.map((product) => product._id)
    await Product_Model.deleteMany({
        _id: { $in: ids_to_delete },
    })

    // 8. reply
    return {
        code: 200,
        data: undefined,
    }
}
