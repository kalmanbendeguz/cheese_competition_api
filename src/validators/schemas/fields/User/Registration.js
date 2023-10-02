const Joi = require('joi')

const registration_validator = (convert) => Joi.object({
    registration_temporary: Joi.boolean().prefs({ convert: convert }).required(),

    confirm_registration_id: Joi.string()
        .trim()
        .lowercase()
        .length(32)
        .alphanum()
        .prefs({ convert: convert })
        .when('registration_temporary', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.optional(),
        }),

}).unknown(true)

module.exports = registration_validator