const Joi = require('joi')

const filter_validator = Joi.object({
    _id: Joi.any().optional(),
    competition_id: Joi.any().optional(),
    competitor_id: Joi.any().optional(),
    public_id: Joi.any().optional(),
    secret_id: Joi.any().optional(),
    product_category_id: Joi.any().optional(),
    product_name: Joi.any().optional(),
    anonimized_product_name: Joi.any().optional(),
    factory_name: Joi.any().optional(),
    product_description: Joi.any().optional(),
    anonimized_product_description: Joi.any().optional(),
    maturation_time_type: Joi.any().optional(),
    approved: Joi.any().optional(),
    maturation_time_quantity: Joi.any().optional(),
    maturation_time_unit: Joi.any().optional(),
    approval_type: Joi.any().optional(),
    handed_in: Joi.any().optional(),
})

module.exports = filter_validator