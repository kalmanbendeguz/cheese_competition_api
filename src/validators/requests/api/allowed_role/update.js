const Joi = require('joi')

const allowed_roles_modifier_string_validator = (value, helpers) => {
    // we know: string, trimmed, matches the regex, but not unique
    const array = value.split(' ').map(word => word.substring(1))
    const set = new Set(array)
    if(array.length === set.size) {
        return value
    } else {
        throw new Error('allowed_role_setters_should_contain_a_role_only_once')
    }
}

const data_validator = Joi.object({
    query: Joi.object({
        _id: Joi.any().optional(),
        email: Joi.any().optional(),
        allowed_roles: Joi.any().optional(),
    }).required(),
    body: Joi.object({
        // email // cannot change email
        allowed_roles: Joi.alternatives().try(
            Joi.array().items(
                Joi.string().valid('judge', 'organizer', 'receiver')
            ).unique().min(1),
            Joi.string().trim().prefs({ convert: false }).regex(/^(\s*([-+](judge|organizer|receiver))\s*)+$/)
            .custom(allowed_roles_modifier_string_validator)
        ).required()
    }).required()
}).required()

module.exports = data_validator