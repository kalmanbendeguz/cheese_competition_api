const allowed_role_authorizer = (data, verb, user) => {
    const rules = {
        _id: {
            create: {},
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
            update: {},
            remove: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        email: {
            create: {
                SERVER: { rule: 'required' },
                organizer: { rule: 'required' },
            },
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
            update: {},
            remove: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        allowed_roles: {
            create: {
                SERVER: { rule: 'required' },
                organizer: { rule: 'required' },
            },
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
            update: {
                SERVER: { rule: 'required' },
                organizer: { rule: 'required' },
            },
            remove: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
    }

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(data, verb, user, rules)
    return data
}

module.exports = allowed_role_authorizer