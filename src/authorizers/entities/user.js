const user_authorizer = (data, verb, user) => {
    // TODO: project _id sometimes need to be BOUND to 0 (the number ZERO)
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
        username: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        hashed_password: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        roles: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        full_name: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        contact_phone_number: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        billing_information: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        association_member: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        registration_temporary: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        confirm_registration_id: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        table_leader: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        arrived: {
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

module.exports = user_authorizer