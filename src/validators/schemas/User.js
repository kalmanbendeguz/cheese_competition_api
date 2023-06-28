const Joi = require('joi')
const Billing_Information_Validator = require('./Billing_Information')
const { mongoose: { Types: { ObjectId }, }, } = require('mongoose')

module.exports = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string()
        .trim()
        .alphanum()
        .min(5)
        .max(40)
        .prefs({ convert: false })
        .required(),
    hashed_password: Joi.string().min(1).required(),
    roles: Joi.array()
        .items(
            Joi.string().valid('competitor', 'judge', 'organizer', 'receiver')
        )
        .unique()
        .min(0)
        .required(),
    full_name: Joi.when('roles', {
        is: Joi.array().min(1).items(Joi.string().valid('competitor', 'judge')),
        then: Joi.string()
            .trim()
            .min(1)
            .required()
            .prefs({ convert: false }),
        otherwise: Joi.forbidden(),
    }),
    contact_phone_number: Joi.when('roles', {
        is: Joi.array().items(Joi.string().invalid('competitor')),
        then: Joi.forbidden(),
        otherwise: Joi.string()
            .pattern(/^\+?\d+$/)
            .required(),
    }),
    billing_information: Joi.when('roles', {
        is: Joi.array().items(Joi.string().invalid('competitor')),
        then: Joi.forbidden(),
        otherwise: Billing_Information_Validator.required(),
    }),
    association_member: Joi.when('roles', {
        is: Joi.array().items(Joi.string().invalid('competitor')),
        then: Joi.forbidden(),
        otherwise: Joi.boolean().required(),
    }),
    registration_temporary: Joi.boolean().required(),
    confirm_registration_id: Joi.when('registration_temporary', {
        is: true,
        then: Joi.string()
            .trim()
            .lowercase()
            .length(32)
            .alphanum()
            .required()
            .prefs({ convert: false }),
        otherwise: Joi.forbidden(),
    }),
    table_leader: Joi.when('roles', {
        is: Joi.array().items(Joi.string().invalid('judge')),
        then: Joi.forbidden(),
        otherwise: Joi.array()
            .items(Joi.object().instance(ObjectId))
            .required(),
    }),
    arrived: Joi.when('roles', {
        is: Joi.array().items(Joi.string().invalid('judge')),
        then: Joi.forbidden(),
        otherwise: Joi.array()
            .items(Joi.object().instance(ObjectId))
            .required(),
    }),
}).unknown(true)
