const entity_authorizer = (actor, verb, data) => {

    const rules = {
        'organizer': { // RUD
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
                forbidden: ['_id'],
                optional: ['anonymous'],
                required: '*',
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
                forbidden: ['_id'],
                optional: ['anonymous'],
                required: '*',
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