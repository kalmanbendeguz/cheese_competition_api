const Joi = require('joi')

const query_validator = Joi.object({
    _id: Joi.any().optional(),
    product_id: Joi.any().optional(),
    judge_id: Joi.any().optional(),
    anonymous: Joi.any().optional(),
    aspects: Joi.any().optional(),
    overall_impression: Joi.any().optional(),
}).required()

module.exports = query_validator