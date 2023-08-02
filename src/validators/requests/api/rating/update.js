const Joi = require('joi')
const Rating_Aspect_Validator = require('../../../schemas/Rating_Aspect')

const data_validator = Joi.object({
    query: Joi.object({
        _id: Joi.any().optional(),
        product_id: Joi.any().optional(),
        judge_id: Joi.any().optional(),
        anonymous: Joi.any().optional(),
        aspects: Joi.any().optional(),
        overall_impression: Joi.any().optional(),
    }).required(),
    body: Joi.object({
        // product_id // Forbidden to update.
        // judge_id // Forbidden to update.
        anonymous: Joi.boolean().optional(),
        aspects: Joi.array()
            .items(Rating_Aspect_Validator)
            .min(1)
            .optional(),
        overall_impression: Joi.string().trim().min(25).max(250).prefs({ convert: false }).optional(),
    }).required(),
}).required()

module.exports = data_validator