const Joi = require('joi')

const barion_state_validator = (convert) => Joi.object({

    barion_payment_id: Joi.string()
        .trim()
        .min(1)
        .prefs({ convert: convert })
        .when('pending', {
            is: false,
            then: Joi.required(),
            otherwise: Joi.optional(),
        }),
    barion_transaction_id: Joi.string()
        .trim()
        .min(1)
        .prefs({ convert: convert })
        .when('pending', {
            is: false,
            then: Joi.required(),
            otherwise: Joi.optional(),
        })
}).unknown(true)

module.exports = barion_state_validator