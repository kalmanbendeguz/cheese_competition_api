const Joi = require('joi')

const query_validator = Joi.object({
    filter: Joi.object().optional(),
    projection: Joi.object().pattern(Joi.string(), Joi.valid(1)).min(1).required(),
    options: Joi.object({
        limit: Joi.number().integer().positive().optional(),
        skip: Joi.number().integer().min(0).optional(),
        sort: Joi.object().pattern(Joi.string(), Joi.valid(1, -1)).optional(),
    }).optional(),
}).required()

module.exports = query_validator