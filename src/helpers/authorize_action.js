const authorize_action = (action, user) => {
    const allowed_roles = require(`../../authorizers/actions/${action}`)

    const role = user?.role ?? 'UNAUTHENTICATED'

    if(!allowed_roles.includes(role)) throw `action_'${action}'_is_forbidden_for_role_'${role}'`

    return
}
//////


//////

//const authorizer = require('../../../authorizers/product')
//try {
//    body = body.map((product) => authorizer(product, 'create', user))
//} catch (reason) {
//    return {
//        code: 403,
//        data: reason
//    }
//}