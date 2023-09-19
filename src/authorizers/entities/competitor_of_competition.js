const entity_authorizer = async (actor, verb, data, session) => {

    // competitor: CRUD 
    // judge: R.
    // organizer: CRUD.
    // receiver: R.
    // ROLELESS: -
    // SERVER: CRUD
    // UNAUTHENTICATED: -

    let rules = {
        'competitor': {
            'create': {
                bound: { user_id: actor._id.toString(), roles: ['competitor'] },
                required: ['competition_id'],
                forbidden: '*'
            },
            'find remove': {
                bound: { competitor_id: actor._id.toString() },
                forbidden: ['arrived', 'table_leader'],
                optional: '*'
            },
            '*': 'forbidden'
        },

        'organizer': {
            'find remove': 'optional',
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