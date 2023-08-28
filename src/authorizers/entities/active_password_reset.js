const active_password_reset_authorizer = (data, verb, user) => {
    // competitor, judge, organizer, receiver, ROLELESS, UNAUTHENTICATED, SERVER
    // only required and bound should throw error. forbidden can be filtered. optional is "as-is"

    const rules = {
        SERVER: {
            create: {
                // the order does not matter, always the last rule is the real rule for a field
                // ONLY THE LAST rule can be '*'
                // if a field is not provided, it is optional
                required: ['user_id'], // user_id is required for creation
                forbidden: '*', // everything else is forbidden
            },
            find: {
                optional: '*' // everything is allowed for find (so we allow everything but nothing is necessary)
            },
            update: {
                forbidden: '*' // everything is forbidden for update
            },
            remove: {
                optional: '*' // everything is allowed for remove (so we allow everything but nothing is necessary)
            }
        },
        '*': 'forbidden' // everyone else is forbidden to do any operation with active_password_reset
    }

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(data, verb, user, rules)
    return data
}

module.exports = active_password_reset_authorizer