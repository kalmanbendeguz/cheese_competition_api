const Joi = require('joi')
const Rating_Aspect_Validator = require('../../../schemas/Rating_Aspect')

const object_schema = Joi.object({
    product_id: Joi.string().trim().min(1).prefs({ convert: false }).required(),
    judge_id: Joi.string().trim().min(1).prefs({ convert: false }).required(),
    anonymous: Joi.boolean().optional(), // Default: false
    aspects: Joi.array()
        .items(
            Rating_Aspect_Validator
            // At 'Check dependencies', ask from the product: is this conforming with the product's rating sheet?
        )
        .required()
        .min(1),
    overall_impression: Joi.string().trim().min(25).max(250).required(),
}).required()

const array_schema = Joi.array().items(object_schema).min(1).required()

const alternatives_schema = Joi.alternatives().try(object_schema, array_schema)

module.exports = alternatives_schema