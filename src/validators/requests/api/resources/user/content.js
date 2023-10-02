const Joi = require('joi')
const user_roles = require('../../../../static/user_roles.json')
const Billing_Information_Validator = require('../../../schemas/fields/Billing_Information')
const Registration_Validator = require('../../../schemas/fields/User/Registration')

const content_validator = Joi.object({
    allowed_role_id: Joi.string().trim().min(1).optional(),

    email: Joi.string().email().optional(),

    username: Joi.string()
        .trim()
        .alphanum()
        .min(5)
        .max(40)
        .optional(),
    hashed_password: Joi.string().min(1).optional(),
    full_name: Joi.string()
        .trim()
        .min(1)
        .max(5000)
        .optional(),
    registration: Registration_Validator(true).optional(),
    roles: Joi.alternatives().try(
        Joi.array()
            .items(Joi.string().valid(...user_roles))
            .unique()
            .min(0),
        Joi.object({
            method: Joi.string.valid('add', 'remove').required(),
            array: Joi.array()
                .items(Joi.string().valid(...user_roles))
                .min(1)
                .required(),
        }),
    ).optional(),

    contact_phone_number: Joi.string().pattern(/^\+?\d+$/).optional(),
    billing_information: Billing_Information_Validator(true).optional(),
    association_member: Joi.boolean().optional(),
})

module.exports = content_validator