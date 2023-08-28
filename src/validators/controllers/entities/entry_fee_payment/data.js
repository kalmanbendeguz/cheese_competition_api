const Joi = require('joi')
const valid_currencies = require('../../../../static/valid_currencies.json')

const data_validator = Joi.object({
    product_ids: Joi.alternatives().try(
        Joi.array()
            .items(
                Joi.string().trim().min(1).prefs({ convert: false }).required()
            )
            .min(1),
        Joi.object({
            method: Joi.string.valid('add', 'remove').required(),
            array: Joi.array()
                .items(Joi.string().trim().min(1).prefs({ convert: false }).required())
                .min(1)
                .required(),
        }),
    ).optional(),
    pos_transaction_id: Joi.string()
        .trim()
        .lowercase()
        .length(32)
        .alphanum()
        .prefs({ convert: false })
        .optional(),
    confirm_payment_id: Joi.string()
        .trim()
        .lowercase()
        .length(32)
        .alphanum()
        .prefs({ convert: false })
        .optional(),

    pending: Joi.boolean().optional(),

    barion_payment_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
    barion_transaction_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
    amount: Joi.number().positive().optional(), // Important: .number() also matches strings that can be converted to numbers!
    currency: Joi.string().valid(...valid_currencies).optional(),
    // expiring_started // Internal
})

module.exports = data_validator