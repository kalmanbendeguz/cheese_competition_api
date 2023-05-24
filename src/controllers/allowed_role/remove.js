// ONLY SERVER
module.exports = async (query, user) => {
    const update_user = require('../user/update')

    // 1. validate query
    const remove_allowed_role_validator = require('../../validators/requests/api/allowed_role/remove')
    try { await remove_allowed_role_validator.validateAsync(query) }
    catch (err) { return { code: 400, data: err.details } }

    // 2. authorize {query, user}
    const authorizer = require('../../authorizers/allowed_role')
    const authorizer_result = authorizer(query, 'remove', user)
    if (!authorizer_result.authorized) { return { code: 403, data: authorizer_result.message } }

    // 3. prepare find
    const filter = query

    // 4. find
    const Allowed_Role_Model = require('../../models/Allowed_Role')
    const allowed_roles = await Allowed_Role_Model.find(
        filter,
        //projection, // ez sem kell.
        //options // nem kell, mert csak sort, limit, skip, és lean lehetne, de egyik sem kell.
    )
    if (allowed_roles.length === 0) return {
        code: 404,
        data: 'no_documents_found_to_remove'
    }

    // 5. check dependencies
    // an organizer cannot delete his own allowed role
    if (user.role === 'organizer' && allowed_roles.some(allowed_role => allowed_role.email === user.email)) return {
        code: 403,
        data: 'an_organizer_can_not_remove_his_own_organizer_role'
    }

    // 6. update dependents
    // we should take the removed roles from users
    const update_user_promises = allowed_roles.map(allowed_role => update_user(
        {
            query: { email: allowed_role.email },
            body: { roles: allowed_role.allowed_roles.map(ar => `-${ar}`).join(' ') } // '-organizer -judge'
        },
        {
            role: 'SERVER'
        }
    ))
    await Promise.all(update_user_promises)

    // 7. remove
    const ids_to_delete = allowed_roles.map(allowed_role => allowed_role._id)
    await Allowed_Role_Model.deleteMany({
        _id: { $in: ids_to_delete }
    })

    // 8. reply
    return {
        code: 200,
        data: undefined
    }
}