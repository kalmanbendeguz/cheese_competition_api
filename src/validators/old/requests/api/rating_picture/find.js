const Joi = require('joi')

const query_validator = Joi.object({
    filter: Joi.object({
        _id: Joi.any().optional(),
        rating_id: Joi.any().optional(),
        picture: Joi.any().optional(),
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