const Joi = require('joi')
const Rating_Aspect_Validator = require('../../../schemas/fields/Rating_Aspect')

const data_validator = Joi.object({
    competition_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
    product_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
    judge_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),

    anonymous: Joi.boolean().optional(),
    aspects: Joi.alternatives().try(
        Joi.array()
            .items(Rating_Aspect_Validator)
            .unique((a, b) => a.title === b.title)
            .min(1),
        Joi.object({
            method: Joi.string.valid('add', 'remove').required(),
            array: Joi.array()
                .items(Rating_Aspect_Validator)
                .unique((a, b) => a.title === b.title)
                .min(1)
                .required(),
        }),
    ).optional(),
    overall_impression: Joi.string().trim().min(25).max(500).prefs({ convert: false }).optional(),
})

module.exports = data_validator