const allowed_role_authorizer = (data, verb, user) => {

    const abc = {
        competitor: {
            create: {
                bound: {field1: user._id.toString(), field2: user.email.toString()},
                required: ['field3', 'field4'],
                forbidden: ['field5', 'field6'],
                // everything else is optional
            },
            find: {
                bound: {},
                required: '*' // everything is required
                // everything else is optional
            },
            '*': {} // every other action
        },
        '*': {} // everyone else
    }

    const rules = {
        _id: {
            create: {},
            find: {},
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {},
            update: {},
            remove: {},
        },
        email: {
            create: {},
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {},
            update: {},
            remove: {},
        },
        allowed_roles: {
            create: {},
            find: {},
            project: {
                SERVER: { rule: 'optional' },
            },
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