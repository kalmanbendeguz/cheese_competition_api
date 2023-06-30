const user_authorizer = (data, verb, user) => {
    // TODO: project _id sometimes need to be BOUND to 0 (the number ZERO)
    const rules = {
        _id: {
            create: {},
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        email: {
            create: {
                SERVER: { rule: 'required' },
            },
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        username: {
            create: {
                SERVER: { rule: 'required' },
            },
            find: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                ROLELESS: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        hashed_password: {
            create: {
                SERVER: { rule: 'required' },
            },
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {},
        },
        roles: {
            create: {
                SERVER: { rule: 'forbidden' },
            },
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                organizer: { rule: 'optional' },
                ROLELESS: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        full_name: {
            create: {
                SERVER: { rule: 'optional' },
            },
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        contact_phone_number: {
            create: {
                SERVER: { rule: 'optional' },
            },
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        billing_information: {
            create: {
                SERVER: { rule: 'optional' },
            },
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        association_member: {
            create: {},
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        registration_temporary: {
            create: {},
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        confirm_registration_id: {
            create: {},
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        table_leader: {
            create: {},
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        arrived: {
            create: {},
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
    }

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(data, verb, user, rules)
    return data
}

module.exports = user_authorizer