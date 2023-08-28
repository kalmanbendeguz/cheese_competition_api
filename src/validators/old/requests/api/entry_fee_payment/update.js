const Joi = require('joi')
const valid_currencies = require('../../../../static/valid_currencies.json')

// barion_payment_id should be added if pending set from true to false. this is done by update validator
// barion_transaction_id should be added if pending set from true to false. this is done by update validator
// amount should be added if pending set from true to false. this is done by update validator
// currency should be added if pending set from true to false. this is done by update validator
const data_validator = Joi.object({
    query: Joi.object({
        _id: Joi.any().optional(),
        product_ids: Joi.any().optional(),
        pending: Joi.any().optional(),
        barion_payment_id: Joi.any().optional(),
        barion_transaction_id: Joi.any().optional(),
        amount: Joi.any().optional(),
        currency: Joi.any().optional(),
        pos_transaction_id: Joi.any().optional(),
        confirm_payment_id: Joi.any().optional(),
        expiring_started: Joi.any().optional(),
    }).required(),
    body: Joi.object({
        // product_ids // Forbidden to update.
        pending: Joi.boolean().optional(),
        barion_payment_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
        barion_transaction_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
        amount: Joi.number().positive().optional(), // Important: .number() also matches strings that can be converted to numbers!
        currency: Joi.string().valid(...valid_currencies).optional(),
        // pos_transaction_id // Forbidden to update.
        // confirm_payment_id // Forbidden to update.
    }).required(),
}).required()

module.exports = data_validator