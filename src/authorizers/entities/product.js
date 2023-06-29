const product_authorizer = (data, verb, user) => {

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
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        competition_id: {
            create: {
                competitor: { rule: 'required' },
                SERVER: { rule: 'required' },
            },
            find: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        competitor_id: {
            create: {
                SERVER: { rule: 'required' },
            },
            find: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        public_id: {
            create: {},
            find: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        secret_id: {
            create: {},
            find: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        product_name: {
            create: {
                competitor: { rule: 'required' },
                SERVER: { rule: 'required' },
            },
            find: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {
                organizer: { rule: 'optional' },
            },
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        anonimized_product_name: {
            create: {
                SERVER: { rule: 'optional' },
            },
            find: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        factory_name: {
            create: {
                competitor: { rule: 'required' },
                SERVER: { rule: 'required' },
            },
            find: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        maturation_time_type: {
            create: {
                competitor: { rule: 'required' },
                SERVER: { rule: 'required' },
            },
            find: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        maturation_time_quantity: {
            create: {
                competitor: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            find: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        maturation_time_unit: {
            create: {
                competitor: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            find: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        milk_type: {
            create: {
                competitor: { rule: 'required' },
                SERVER: { rule: 'required' },
            },
            find: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        product_category_id: {
            create: {
                competitor: { rule: 'required' },
                SERVER: { rule: 'required' },
            },
            find: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        product_description: {
            create: {
                competitor: { rule: 'required' },
                SERVER: { rule: 'required' },
            },
            find: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        anonimized_product_description: {
            create: {
                SERVER: { rule: 'optional' },
            },
            find: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        approved: {
            create: {
                SERVER: { rule: 'optional' },
            },
            find: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        approval_type: {
            create: {
                SERVER: { rule: 'optional' },
            },
            find: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        handed_in: {
            create: {
                SERVER: { rule: 'optional' },
            },
            find: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
    }

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(data, verb, user, rules)
    return data
}

module.exports = product_authorizer