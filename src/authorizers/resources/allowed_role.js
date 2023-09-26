const entity_authorizer = async (actor, verb, data, session) => {

    let rules = {
        'competitor judge receiver ROLELESS': {
            find: {
                bound: { email: actor.email },
                optional: '*'
            },
            '*': 'forbidden'
        },
        'organizer SERVER': {
            create: {
                required: ['email', 'allowed_roles'],
                forbidden: '*'
            },
            update: {
                optional: ['allowed_roles'],
                forbidden: '*',
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