const entity_authorizer = (actor, verb, data) => {

    const rules = {
        'SERVER': {
            'create': {
                bound: { pending: true },
                required: ['product_ids', 'pos_transaction_id', 'confirm_payment_id'],
                forbidden: '*',
            },
            'find': 'optional',
            'update': {
                optional: ['pending', 'barion_payment_id', 'barion_transaction_id', 'amount', 'currency'],
                forbidden: '*',
            },
            '*': 'forbidden'
        },
        '*': 'forbidden'
    }

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(actor, verb, data, rules)
    return data
}

module.exports = entity_authorizer