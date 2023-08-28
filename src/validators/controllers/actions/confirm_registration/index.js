const Joi = require('joi')

const validator = Joi.object({
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

module.exports = validator