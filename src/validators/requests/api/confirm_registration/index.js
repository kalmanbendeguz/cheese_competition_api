const Joi = require('joi')

const confirm_registration_validator = Joi.object({
    query: Joi.object({
        confirm_registration_id: Joi.string()
            .trim()
            .lowercase()
            .length(32)
            .alphanum()
            .required()
            .prefs({ convert: false }),
    }).required(),
}).unknown(true).required()

module.exports = confirm_registration_validator