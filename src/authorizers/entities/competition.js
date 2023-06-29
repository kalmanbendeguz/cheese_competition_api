const competition_authorizer = (data, verb, user) => {
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
        name: {
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
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
            remove: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        place: {
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
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
            remove: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        creation_date: {
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
        entry_opened: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
            remove: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        last_entry_open_date: {
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
        last_entry_close_date: {
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
        competition_opened: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
            remove: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        last_competition_open_date: {
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
        last_competition_close_date: {
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
        archived: {
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
            update: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
            remove: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        archival_date: {
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
        payment_needed: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
            remove: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        association_members_need_to_pay: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
            remove: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        entry_fee_amount: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
            remove: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        entry_fee_currency: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
            remove: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        product_category_tree: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
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
        certificate_template: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {},
            update: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
            remove: {},
        },
        ignore_extreme_values: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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

module.exports = competition_authorizer