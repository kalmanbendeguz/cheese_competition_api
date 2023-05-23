const Joi = require('joi')
const Billing_Information_Validator = require('../../../schemas/Billing_Information')

const object_schema = Joi.object({
    username: Joi.string().trim().alphanum().min(5).max(40).prefs({ convert: false }).required(), //IC: if not unique
    email: Joi.string().email().required(), // IC: if not unique
    hashed_password: Joi.string().min(1).required(), // IC: never
    roles: Joi.array().items(
        Joi.string().valid('competitor', 'judge', 'organizer', 'receiver')
    ).unique().min(1).required(),
    full_name: Joi.when('roles', {
        is: Joi.array().length(1).items(Joi.string().valid('organizer')),
        then: Joi.forbidden(),
        otherwise: Joi.string().trim().min(1).required().prefs({ convert: false })
    }),
    contact_phone_number: Joi.when('roles', {
        is: Joi.array().items(Joi.string().invalid('competitor')),
        then: Joi.forbidden(),
        otherwise: Joi.string().pattern(/^\+?\d+$/).required()
    }),
    billing_information: Joi.when('roles', {
        is: Joi.array().items(Joi.string().invalid('competitor')),
        then: Joi.forbidden(),
        otherwise: Billing_Information_Validator.required()
    }),
    //association_member // if roles contains competitor, this defaults to false
    //table_leader // if roles contains judge, this defaults to []
    //arrived // if roles contains judge, this defaults to []
    //registration_temporary // defaults to true
    //confirm_registration_id // generated internally
}).required()

const array_schema = Joi.array().items(object_schema).min(1).required()

module.exports = Joi.alternatives().try(
    object_schema,
    array_schema
)

