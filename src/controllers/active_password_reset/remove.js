// ONLY SERVER
module.exports = async (query, user) => {

    // 1. validate query
    const remove_active_password_reset_validator = require('../../validators/requests/api/active_password_reset/remove')
    try { await remove_active_password_reset_validator.validateAsync(query) }
    catch (err) { return { code: 400, data: err.details } }

    // 2. authorize {query, user}
    const authorizer = require('../../authorizers/active_password_reset')
    const authorizer_result = authorizer(query, 'remove', user)
    if (!authorizer_result.authorized) { return { code: 403, data: authorizer_result.message } }

    // 3. prepare find
    const filter = query

    // 4. find
    const Active_Password_Reset_Model = require('../../models/Active_Password_Reset')
    const active_password_resets = await Active_Password_Reset_Model.find(
        filter,
        //projection, // ez sem kell.
        //options // nem kell, mert csak sort, limit, skip, és lean lehetne, de egyik sem kell.
    )
    if (active_password_resets.length === 0) return {
        code: 404,
        data: 'no_documents_found_to_remove'
    }

    // 5. check dependencies
    // nothing needs to be done here.

    // 6. update dependencies
    // nothing needs to be done here.

    // 7. remove
    const ids_to_delete = active_password_resets.map(active_password_reset => active_password_reset._id)
    await Active_Password_Reset_Model.deleteMany({
        _id: { $in: ids_to_delete }
    })

    // 8. reply
    return {
        code: 200,
        data: undefined
    }
}