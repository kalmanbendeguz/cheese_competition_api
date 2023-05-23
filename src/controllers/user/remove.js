// ONLY SERVER
module.exports = async (query, user) => {
    const User_Model = require('../../models/User')
    const remove_active_password_reset = require('../../controllers/active_password_reset/remove')
    const remove_product = require('../../controllers/product/remove')
    const remove_rating = require('../../controllers/rating/remove')

    // 1. validate query
    const remove_user_validator = require('../../validators/requests/api/user/remove')
    try { await remove_user_validator.validateAsync(query) }
    catch (err) { return { code: 400, data: err.details } }

    // 2. authorize {query, user}
    const authorizer = require('../../authorizers/user')
    const authorizer_result = authorizer(query, 'remove', user)
    if (!authorizer_result.authorized) { return { code: 403, data: authorizer_result.message } }

    // 3. prepare find: produce 'filter' completely. if only server, then no changes should happen(?)
    const filter = query

    // 4. find
    const users = await User_Model.find(filter)
    if (users.length === 0) return {
        code: 404,
        data: 'no_documents_found_to_remove'
    }

    // 5. check dependents
    // nothing needs to be done here.

    // 6. update dependents
    for (const u of users) {
        // remove active_password_resets
        await remove_active_password_reset({ user_id: u._id }, { role: 'SERVER' })
        // remove products
        await remove_product({ competitor_id: u._id }, { role: 'SERVER' })
        // remove ratings
        await remove_rating({ judge_id: u._id }, { role: 'SERVER' })
    }

    // 7. remove
    const ids_to_delete = users.map(u => u._id)
    await User_Model.deleteMany({
        _id: { $in: ids_to_delete }
    })

    // 8. reply
    return {
        code: 200,
        data: undefined
    }
}