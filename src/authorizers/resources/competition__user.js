const entity_authorizer = async (actor, verb, data, session) => {

    let rules = {
        'judge': {
            'find': {
                bound: { judge_id: actor._id.toString() },
                optional: '*'
            },
            '*': 'forbidden'
        },
        'organizer SERVER': {
            'create': {
                required: ['judge_id', 'competition_id'],
                forbidden: ['_id'],
                optional: '*'
            },
            'update': {
                optional: ['arrived', 'table_leader'],
                forbidden: '*'
            },
            'find remove': 'optional',
        },
        '*': 'forbidden'
    }

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(actor, verb, data, rules)
    return data
}

module.exports = entity_authorizer