const Joi = require('joi')
const Rating_Aspect_Validator = require('../../../schemas/fields/Rating/Aspect')
const { mongoose: { Types: { Decimal128 }, }, } = require('mongoose')

const content_validator = Joi.object({

    competition_id: Joi.string().trim().min(1).optional(),
    product_id: Joi.string().trim().min(1).optional(),
    user_id: Joi.string().trim().min(1).optional(),
    competition__user_id: Joi.string().trim().min(1).optional(),

    anonymous: Joi.boolean().optional(),
    aspects: Joi.alternatives().try(
        Joi.array()
            .items(Rating_Aspect_Validator(true))
            .unique((a, b) => a.title === b.title)
            .min(1),
        Joi.object({
            method: Joi.string.valid('add', 'remove').required(),
            array: Joi.array()
                .items(Rating_Aspect_Validator(true))
                .unique((a, b) => a.title === b.title)
                .min(1)
                .required(),
        }),
    ).optional(),
    overall_impression: Joi.string().trim().min(20).max(1000).optional(),
    weight: Joi.alternatives().try(
        Joi.number().min(0),
        Joi.object().instance(Decimal128),
    ).optional(),
    
})

module.exports = content_validator