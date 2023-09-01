const entity_authorizer = (actor, verb, data) => {

    //competitor: CRUD
    //judge: R

    //organizer: RUD
    //receiver: RU
    //roleless: -
    //server: CRUD
    //unauthenticated: -
    const Joi = require('joi')

    const rules = {
        'competitor': {
            'create': {
                bound: { competitor_id: actor._id.toString() },
                required: ['competition_id', 'product_category_id', 'product_name', 'factory_name', 'product_description', 'maturation_time_type'],
                optional: ['maturation_time_quantity', 'maturation_time_unit'],
                forbidden: '*'
            },
            'find remove': {
                bound: { competitor_id: actor._id.toString() },
                forbidden: ['_id', 'secret_id', 'anonimized_product_name', 'anonimized_product_description'],
                optional: '*'
            },
            'update': {
                optional: ['product_category_id', 'product_name', 'factory_name', 'product_description', 'maturation_time_type', 'maturation_time_quantity', 'maturation_time_unit'],
                forbidden: '*'
            },
        },
        'judge': {
            'find': {
                pattern: { secret_id: Joi.string().allow('') },
                optional: ['competition_id', 'product_category_id', 'anonimized_product_name', 'anonimized_product_description', 'maturation_time_type', 'maturation_time_quantity', 'maturation_time_unit'],
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