const entity_authorizer = (actor, verb, data) => {

    const rules = {
        'organizer': {
            'create': {
                bound: { organizer_id: actor._id.toString() },
                required: ['competition_id'],
                forbidden: '*'
            },
            'find remove': {
                bound: { organizer_id: actor._id.toString() },
                optional: '*'
            },
            '*': 'forbidden'
        },
        'SERVER': {
            'create': {
                required: ['organizer_id', 'competition_id'],
                forbidden: '*'
            },
            'find remove': 'optional',
            '*': 'forbidden'
        },
        '*': 'forbidden'
    }

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(actor, verb, data, rules)
    return data
}

module.exports = entity_authorizer