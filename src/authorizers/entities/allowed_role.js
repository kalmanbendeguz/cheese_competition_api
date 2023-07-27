const allowed_role_authorizer = (data, verb, user) => {
    const rules = {
        _id: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        email: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        allowed_roles: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
    }

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(data, verb, user, rules)
    return data
}

module.exports = allowed_role_authorizer