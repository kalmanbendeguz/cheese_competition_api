// ORGANIZER, SERVER
module.exports = async (query, user) => {
    const Competition_Model = require('../../models/Competition')
    const Product_Model = require('../../models/Product')
    const remove_product = require('../product/remove')

    // 1. validate query
    const remove_competition_validator = require('../../validators/requests/api/competition/remove')
    try {
        await remove_competition_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. authorize {query, user}
    const authorizer = require('../../authorizers/competition')
    const authorizer_result = authorizer(query, 'remove', user)
    if (!authorizer_result.authorized) {
        return { code: 403, data: authorizer_result.message }
    }

    // 3. prepare find
    const filter = query

    // 4. find
    const competitions = await Competition_Model.find(filter)
    if (competitions.length === 0)
        return {
            code: 404,
            data: 'no_documents_found_to_remove',
        }

    // 5. check dependencies: is there anything that prevents this remove?
    // a competition has no dependencies, so only look for property things.
    // it is not possible to remove paid products
    const ids_to_delete = competitions.map((competition) => competition._id)
    if (
        await Product_Model.exists({
            competition_id: { $in: ids_to_delete },
            approval_type: 'payment',
        })
    )
        return {
            code: 403,
            data: 'cannot_remove_competition_because_there_are_paid_products_associated_with_it',
        }

    // 6. update dependents: CHECK IF THIS OPERATION SUCCEEDS.
    // remove all products of all competitions
    const remove_product_promises = competitions.map((competition) =>
        remove_product(
            {
                competition_id: competition._id.toString(),
            },
            {
                role: 'SERVER',
            }
        )
    )
    await Promise.all(remove_product_promises)

    // 7. remove
    await Competition_Model.deleteMany({
        _id: { $in: ids_to_delete },
    })

    // 8. reply
    return {
        code: 200,
        data: undefined,
    }
}
