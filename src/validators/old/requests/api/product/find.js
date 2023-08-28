const Joi = require('joi')

const query_validator = Joi.object({
    filter: Joi.object({
        _id: Joi.any().optional(),
        competition_id: Joi.any().optional(),
        competitor_id: Joi.any().optional(),
        public_id: Joi.any().optional(),
        secret_id: Joi.any().optional(),
        product_name: Joi.any().optional(),
        anonimized_product_name: Joi.any().optional(),
        factory_name: Joi.any().optional(),
        maturation_time_type: Joi.any().optional(),
        maturation_time_quantity: Joi.any().optional(),
        maturation_time_unit: Joi.any().optional(),
        milk_type: Joi.any().optional(),
        product_category_id: Joi.any().optional(),
        product_description: Joi.any().optional(),
        anonimized_product_description: Joi.any().optional(),
        approved: Joi.any().optional(),
        approval_type: Joi.any().optional(),
        handed_in: Joi.any().optional(),
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