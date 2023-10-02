const Joi = require('joi')

const confirmation_validator = (convert) => Joi.object({

    pending: Joi.boolean().prefs({ convert: convert }).required(),

    confirm_payment_id: Joi.string()
        .trim()
        .lowercase()
        .length(32)
        .alphanum()
        .prefs({ convert: convert })
        .required(),

}).unknown(true)

module.exports = confirmation_validator