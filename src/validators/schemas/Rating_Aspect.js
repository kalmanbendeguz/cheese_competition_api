const Joi = require('joi')

const rating_aspect_validator = Joi.object({
    title: Joi.string()
        .trim()
        .prefs({ convert: false })
        .min(1)
        .lowercase()
        .required(),
    score: Joi.number().integer().min(0).required(),
    blocks: Joi.array()
        .min(1)
        .items(
            Joi.array()
                .items(Joi.string().trim().prefs({ convert: false }).min(1).lowercase())
                .min(0)
                .unique()
        )
        .required(),
    comment: Joi.string()
        .trim()
        .min(12)
        .max(250)
        .prefs({ convert: false })
        .required(),
}).unknown(true)

module.exports = rating_aspect_validator