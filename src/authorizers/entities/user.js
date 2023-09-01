const entity_authorizer = (actor, verb, data) => {

    const rules = {
        'competitor': {
            'find': {
                bound: { _id: actor._id.toString(), email: actor.email, username: actor.username },
                forbidden: ['hashed_password', 'registration_temporary', 'confirm_registration_id'],
                optional: '*'
            },
            'update': {
                optional: ['username', 'hashed_password', 'full_name', 'contact_phone_number', 'billing_information'],
                forbidden: '*'
            },
            '*': 'forbidden'
        },
        'judge': {
            'find': {
                bound: { _id: actor._id.toString(), email: actor.email, username: actor.username },
                optional: ['full_name', 'roles'],
                forbidden: '*'
            },
            'update': {
                optional: ['username', 'hashed_password', 'full_name'],
                forbidden: '*'
            },
            '*': 'forbidden'
        },
        'organizer': {
            'find': {
                bound: { registration_temporary: false },
                forbidden: ['hashed_password', 'confirm_registration_id', 'confirm_registration_id'],
                optional: '*'
            },
            'update': {
                optional: ['username', 'hashed_password', 'full_name', 'association_member'],
                forbidden: '*'
            },
            '*': 'forbidden'
        },
        'receiver': {
            'find': {
                bound: { roles: { $in: ['competitor', 'receiver'] } },
                forbidden: ['hashed_password', 'registration_temporary', 'confirm_registration_id'],
                optional: '*'
            },
            'update': {
                optional: ['username', 'hashed_password', 'full_name'],
                forbidden: '*'
            },
            '*': 'forbidden'
        },
        'ROLELESS': {
            'find': {
                bound: { _id: actor._id.toString(), email: actor.email, username: actor.username },
                optional: ['full_name', 'roles'],
                forbidden: '*'
            },
            'update': {
                optional: ['username', 'hashed_password', 'full_name'],
                forbidden: '*'
            },
            '*': 'forbidden'
        },
        'SERVER': {
            'create': {
                required: ['email', 'username', 'hashed_password', 'full_name'],
                forbidden: '*'
            },
            'find remove': 'optional',
            'update': {
                forbidden: ['_id', 'email', 'confirm_registration_id'],
                optional: '*'
            },
        },
        '*': 'forbidden',
    }

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(actor, verb, data, rules)
    return data
}

module.exports = entity_authorizer