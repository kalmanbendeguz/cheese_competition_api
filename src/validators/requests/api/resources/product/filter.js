const Joi = require('joi')

const filter_validator = Joi.object({
    _id: Joi.any().optional(),
    competition_id: Joi.any().optional(),
    user_id: Joi.any().optional(),
    entry_fee_payment_id: Joi.any().optional(),
    public_id: Joi.any().optional(),
    secret_id: Joi.any().optional(),
    product_category_id: Joi.any().optional(),
    product_name: Joi.any().optional(),
    anonimized_product_name: Joi.any().optional(),
    factory_name: Joi.any().optional(),
    product_description: Joi.any().optional(),
    anonimized_product_description: Joi.any().optional(),
    maturation_time: Joi.any().optional(),
    state: Joi.any().optional(),
})

module.exports = filter_validator