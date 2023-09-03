const entity_authorizer = async (actor, verb, data, session) => {

    let rules = {
        'organizer': {
            'find remove': 'optional',
            '*': 'forbidden'
        },
        'competitor': {
            'create': {
                bound: { competitor_id: actor._id.toString() },
                required: ['competition_id'],
                forbidden: '*'
            },
            'find remove': {
                bound: { competitor_id: actor._id.toString() },
                optional: '*'
            },
            '*': 'forbidden'
        },
        'SERVER': {
            'create': {
                required: ['competitor_id', 'competition_id'],
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