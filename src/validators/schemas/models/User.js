const Joi = require('joi')
const Billing_Information_Validator = require('./Billing_Information')
const { mongoose: { Types: { ObjectId }, }, } = require('mongoose')
const valid_roles = require('../../../static/valid_roles.json')

const user_validator = Joi.object({
    email: Joi.string().email().required(),

    username: Joi.string()
        .trim()
        .alphanum()
        .min(5)
        .max(40)
        .prefs({ convert: false })
        .required(),
    hashed_password: Joi.string().min(1).required(),
    full_name: Joi.string()
        .trim()
        .min(1)
        .required()
        .prefs({ convert: false }),

    registration_temporary: Joi.boolean().required(),
    roles: Joi.array()
        .items(
            Joi.string().valid(...valid_roles)
        )
        .unique()
        .min(0)
        .required(),

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
    contact_phone_number: Joi.when('roles', {
        is: Joi.array().items(Joi.string().invalid('competitor')),
        then: Joi.forbidden(),
        otherwise: Joi.string()
            .pattern(/^\+?\d+$/) // One optional "+" sign at the beginning, then only numbers
            .optional(),
    }),
    billing_information: Billing_Information_Validator.when('roles', {
        is: Joi.array().items(Joi.string().invalid('competitor')),
        then: Joi.forbidden(),
        otherwise: Joi.required(),
    }),
    association_member: Joi.when('roles', {
        is: Joi.array().items(Joi.string().invalid('competitor')),
        then: Joi.forbidden(),
        otherwise: Joi.boolean().required(),
    }),
}).unknown(true)

module.exports = user_validator