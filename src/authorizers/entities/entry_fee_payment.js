const entry_fee_payment_authorizer = (data, verb, user) => {
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
            },
            update: {},
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        product_ids: {
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
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        pending: {
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
            update: {
                SERVER: { rule: 'optional' },
            },
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        barion_payment_id: {
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
            update: {
                SERVER: { rule: 'optional' },
            },
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        expiring_started: {
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
        barion_transaction_id: {
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
            update: {
                SERVER: { rule: 'optional' },
            },
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        amount: {
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
            update: {
                SERVER: { rule: 'optional' },
            },
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        currency: {
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
            update: {
                SERVER: { rule: 'optional' },
            },
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        pos_transaction_id: {
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
        confirm_payment_id: {
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

module.exports = entry_fee_payment_authorizer