const Joi = require('joi')

const query_validator = Joi.object({
    filter: Joi.object({
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
    }).optional(),
    projection: Joi.object()
        .pattern(Joi.string(), Joi.valid(1).required())
        .min(1)
        .required(),
    options: Joi.object({
        limit: Joi.number().integer().positive().optional(),
        skip: Joi.number().integer().min(0).optional(),
        sort: Joi.object().pattern(Joi.string(), Joi.valid(1, -1)).optional(),
    }).optional(),
}).required()

module.exports = query_validator