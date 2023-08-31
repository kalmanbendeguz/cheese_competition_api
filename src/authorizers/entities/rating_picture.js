const entity_authorizer = (actor, verb, data) => {

    const rules = {
        'organizer': {
            'find remove': 'optional',
            '*': 'forbidden'
        },
        'judge': {
            'create': {
                bound: { judge_id: actor._id.toString() },
                required: ['competition_id', 'product_id', 'rating_id', 'picture'],
                forbidden: ['_id'],
            },
            'update': {
                optional: ['picture'],
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
                required: '*',
            },
            'update': {
                optional: ['picture'],
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