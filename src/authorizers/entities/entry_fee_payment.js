const entry_fee_payment_authorizer = (data, verb, user) => {
    const rules = {
        _id: {
            create: {},
            find: {
                // competitor: { rule: 'optional' },
                // organizer: { rule: 'optional' },
                // receiver: { rule: 'optional' },
                // SERVER: { rule: 'optional' },
            },
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        product_ids: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        pending: {
            // todo: update pending can only be false ( so it can not be set to pending = true)
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        barion_payment_id: {
            create: {},
            find: {},
            project: {},
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
        barion_transaction_id: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        amount: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        currency: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        pos_transaction_id: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        confirm_payment_id: {
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

module.exports = entry_fee_payment_authorizer