const authorize_action = (action, user) => {
    const allowed_roles = require(`../authorizers/actions/${action}`)

    const role = user?.role ?? 'UNAUTHENTICATED'

    if (!allowed_roles.includes(role)) throw `action_'${action}'_is_forbidden_for_role_'${role}'`

    return
}

module.exports = authorize_action