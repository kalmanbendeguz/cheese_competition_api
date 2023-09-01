const entity_authorizer = (actor, verb, data) => {

    const rules = {
        'organizer': {
            'update': {
                optional: ['anonymous', 'aspects', 'overall_impression'],
                forbidden: '*'
            },
            'find remove': 'optional',
            '*': 'forbidden'
        },
        'judge': {
            'create': {
                bound: { judge_id: actor._id.toString() },
                required: ['competition_id', 'product_id', 'aspects', 'overall_impression'],
                optional: ['anonymous'],
                forbidden: '*',
            },
            'update': {
                optional: ['anonymous', 'aspects', 'overall_impression'],
                forbidden: '*'
            },
            'find remove': {
                bound: { judge_id: actor._id.toString() },
                optional: '*'
            },
        },
        'SERVER': {
            'create': {
                required: ['competition_id', 'product_id', 'judge_id', 'aspects', 'overall_impression'],
                optional: ['anonymous'],
                forbidden: '*',
            },
            'update': {
                optional: ['anonymous', 'aspects', 'overall_impression'],
                forbidden: '*'
            },
            '*': 'optional'
        },
        '*': 'forbidden'
    }

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(actor, verb, data, rules)
    return data
}

module.exports = entity_authorizer