const Joi = require('joi')

const filter_validator = Joi.object({
    _id: Joi.any().optional(),
    user_id: Joi.any().optional(),
    competition_id: Joi.any().optional(),
    barion_state: Joi.any().optional(),
    pos_transaction_id: Joi.any().optional(),
    billing_information: Joi.any().optional(),
    confirmation: Joi.any().optional(),
    value: Joi.any().optional(),
    expiring_started: Joi.any().optional(),
})

module.exports = filter_validator