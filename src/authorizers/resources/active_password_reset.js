// should be like: (verb) => (actor,data,session) => {...}

const entity_authorizer = async (actor, verb, data, session) => {

    let rules = {
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