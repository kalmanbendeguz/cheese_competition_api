const entity_authorizer = (actor, verb, data) => {

    const rules = {
        'receiver': {
            'find': {
                bound: { receiver_id: actor._id.toString() },
                optional: '*'
            },
            '*': 'forbidden'
        },
        'organizer SERVER': {
            'create': {
                required: ['receiver_id', 'competition_id'],
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