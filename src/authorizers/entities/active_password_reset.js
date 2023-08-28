const active_password_reset_authorizer = (data, verb, user) => {
    const rules = {
        _id: {
            create: {},
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        user_id: {
            create: {
                SERVER: { rule: 'required' },
            },
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        restore_id: {
            create: {},
            find: {},
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {},
            update: {},
            remove: {},
        },
        expiring_started: {
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

module.exports = active_password_reset_authorizer