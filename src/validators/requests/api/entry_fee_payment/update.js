const Joi = require('joi')

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
    }).required(),
    body: Joi.object({
        //product_ids: Joi.array().items( // generated at creation, cannot change
        //    Joi.string().trim().min(1).prefs({ convert: false }).required(),
        //).min(1).optional(),
        pending: Joi.boolean().optional(),
        barion_payment_id: Joi.string()
            .trim()
            .min(1)
            .prefs({ convert: false })
            .optional(),
        barion_transaction_id: Joi.string()
            .trim()
            .min(1)
            .prefs({ convert: false })
            .optional(),
        amount: Joi.object().instance(Decimal128).optional(),
        currency: Joi.string().valid('HUF', 'EUR', 'USD').optional(),
        //pos_transaction_id // generated at creation, cannot change
        //confirm_payment_id // generated at creation, cannot change
    }).required(),
}).required()

module.exports = data_validator
