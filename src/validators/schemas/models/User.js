const Joi = require('joi')
const Billing_Information_Validator = require('../fields/User/Billing_Information')
const Registration_Validator = require('../fields/User/Registration')
const { mongoose: { Types: { ObjectId }, }, } = require('mongoose')
const user_roles = require('../../../static/user_roles.json')

const user_validator = Joi.object({
    allowed_role_id: Joi.object().instance(ObjectId).optional(),
    
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

    registration: Registration_Validator.required(),

    roles: Joi.array()
        .items(
            Joi.string().valid(...user_roles)
        )
        .unique()
        .min(0)
        .required(),

    contact_phone_number: Joi.string().pattern(/^\+?\d+$/).when('roles', {
        is: Joi.array().items(Joi.string().invalid('competitor')),
        then: Joi.optional(),
        otherwise: Joi.required()
    }),
    billing_information: Billing_Information_Validator.when('roles', {
        is: Joi.array().items(Joi.string().invalid('competitor')),
        then: Joi.optional(),
        otherwise: Joi.required(),
    }),
    association_member: Joi.boolean().when('roles', {
        is: Joi.array().items(Joi.string().invalid('competitor')),
        then: Joi.optional(),
        otherwise: Joi.required(),
    }),
}).unknown(true)

module.exports = user_validator