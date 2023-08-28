const Joi = require('joi')

const filter_validator = Joi.object({
    _id: Joi.any().optional(),
    product_ids: Joi.any().optional(),
    pos_transaction_id: Joi.any().optional(),
    confirm_payment_id: Joi.any().optional(),

    pending: Joi.any().optional(),

    barion_payment_id: Joi.any().optional(),
    barion_transaction_id: Joi.any().optional(),
    amount: Joi.any().optional(),
    currency: Joi.any().optional(),

    expiring_started: Joi.any().optional(),
})

module.exports = filter_validator