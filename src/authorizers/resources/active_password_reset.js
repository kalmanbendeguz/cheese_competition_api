// should be like: (verb) => (actor,data,session) => {...}
// ANYTHING THAT IS THE SAME FOR EVERY ROLE, DOESNT BELONG HERE

// _id
// user_id
// restore_id
// expiring_started

// UNAUTHENTICATED: create, find, remove
// SERVER: create, find, remove

const entity_authorizer = (verb) => async (data, actor, session) => {

    let rules = {
        'UNAUTHENTICATED': {
            'create': {
                required: ['user_id'],
                forbidden: '*',
            },
            'update': 'forbidden',
            '*': 'optional'
        },
        'SERVER': {
            'create': {
                required: ['user_id'],
                forbidden: '*',
            },
            'update': 'forbidden',
            '*': 'optional'
        },
        '*': 'forbidden'
    }

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(actor, verb, data, rules)
    return data
}

module.exports = entity_authorizer