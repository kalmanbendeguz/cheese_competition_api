const Joi = require('joi')

const query_validator = Joi.object({
    filter: Joi.object({
        _id: Joi.any().optional(),
        product_id: Joi.any().optional(),
        judge_id: Joi.any().optional(),
        anonymous: Joi.any().optional(),
        aspects: Joi.any().optional(),
        overall_impression: Joi.any().optional(),
    }).required(),
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
