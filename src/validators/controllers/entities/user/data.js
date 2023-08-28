const Joi = require('joi')
const valid_roles = require('../../../../static/valid_roles.json')
const Billing_Information_Validator = require('../../../schemas/fields/Billing_Information')

const data_validator = Joi.object({
    email: Joi.string().email().optional(),

    username: Joi.string()
        .trim()
        .alphanum()
        .min(5)
        .max(40)
        .prefs({ convert: false })
        .optional(),
    hashed_password: Joi.string().min(1).optional(),
    full_name: Joi.string()
        .trim()
        .min(1)
        .prefs({ convert: false })
        .optional(),

    registration_temporary: Joi.boolean().optional(),
    roles: Joi.alternatives().try(
        Joi.array()
            .items(
                Joi.string().valid(...valid_roles)
            )
            .unique()
            .min(0),
        Joi.object({
            method: Joi.string.valid('add', 'remove').required(),
            array: Joi.array()
                .items(
                    Joi.string().valid(...valid_roles)
                )
                .unique()
                .min(1)
                .required(),
        }),
    ).optional(),

    confirm_registration_id: Joi.string()
        .trim()
        .lowercase()
        .length(32)
        .alphanum()
        .optional()
        .prefs({ convert: false }),

    contact_phone_number: Joi.string()
        .pattern(/^\+?\d+$/) // One optional "+" sign at the beginning, then only numbers (one or more)
        .optional(),

    billing_information: Billing_Information_Validator.optional(),

    association_member: Joi.boolean().optional(),
})

module.exports = data_validator