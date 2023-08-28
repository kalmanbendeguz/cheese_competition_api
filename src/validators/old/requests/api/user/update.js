const Joi = require('joi')
const Billing_Information_Validator = require('../../../schemas/Billing_Information')
const valid_roles = require('../../../../static/valid_roles.json')

const array_modifier_string_validator = (value, helpers) => {
    // we know: string, trimmed, matches the regex, but not unique
    const array = value.split(' ').map((word) => word.substring(1))
    const set = new Set(array)
    if (array.length === set.size) {
        return value
    } else {
        throw new Error('array_role_setter_string_should_contain_a_value_only_once')
    }
}

const data_validator = Joi.object({
    query: Joi.object({
        _id: Joi.any().optional(),
        email: Joi.any().optional(),
        username: Joi.any().optional(),
        // hashed_password // forbidden
        roles: Joi.any().optional(),
        full_name: Joi.any().optional(),
        contact_phone_number: Joi.any().optional(),
        billing_information: Joi.any().optional(),
        association_member: Joi.any().optional(),
        registration_temporary: Joi.any().optional(),
        confirm_registration_id: Joi.any().optional(),
        table_leader: Joi.any().optional(),
        arrived: Joi.any().optional(),
    }).required(),
    body: Joi.object({
        // email // forbidden to update
        username: Joi.string() // Why not? :)
            .trim()
            .alphanum()
            .min(5)
            .max(40)
            .prefs({ convert: false })
            .optional(),
        hashed_password: Joi.string().min(1).optional(),
        roles: Joi.alternatives()
            .try(
                Joi.array()
                    .items(Joi.string().valid(...valid_roles))
                    .unique()
                    .min(0), // It can be changed to roleless.
                Joi.string()
                    .trim()
                    .prefs({ convert: false })
                    .pattern(
                        new RegExp(
                            `^(\s*([-+](${valid_roles.join('|')}))\s*)+$`
                        )
                    )
                    .custom(array_modifier_string_validator)
            )
            .optional(),
        full_name: Joi.string()
            .trim()
            .min(1)
            .prefs({ convert: false })
            .optional(),
        contact_phone_number: Joi.string()
            .pattern(/^\+?\d+$/) // One optional "+" sign at the beginning, then only numbers
            .optional(),
        billing_information: Billing_Information_Validator.optional(),
        association_member: Joi.boolean().optional(),
        registration_temporary: Joi.boolean().optional(),
        confirm_registration_id: Joi.string()
            .trim()
            .lowercase()
            .length(32)
            .alphanum()
            .prefs({ convert: false })
            .optional(),
        table_leader: Joi.alternatives()
            .try(
                Joi.array()
                    .items(Joi.string().trim().min(1).prefs({ convert: false })) // Best way to check for an ObjectId
                    .unique()
                    .min(0), // It can be changed to an empty array.
                Joi.string()
                    .trim()
                    .prefs({ convert: false })
                    .pattern(
                        new RegExp(
                            `^([+-](\S)+)( [+-](\S)+)*$`
                        )
                    )
                    .custom(array_modifier_string_validator)
            )
            .optional(),
        arrived: Joi.alternatives()
            .try(
                Joi.array()
                    .items(Joi.string().trim().min(1).prefs({ convert: false })) // Best way to check for an ObjectId
                    .unique()
                    .min(0), // It can be changed to an empty array.
                Joi.string()
                    .trim()
                    .prefs({ convert: false })
                    .pattern(
                        new RegExp(
                            `^([+-](\S)+)( [+-](\S)+)*$`
                        )
                    )
                    .custom(array_modifier_string_validator)
            )
            .optional(),
    }).required(),
}).required()

module.exports = data_validator
