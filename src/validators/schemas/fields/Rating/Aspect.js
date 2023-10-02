const Joi = require('joi')

const rating_aspect_validator = (convert) => Joi.object({
    title: Joi.string()
        .trim()
        .prefs({ convert: convert })
        .min(1)
        .lowercase()
        .required(),
    score: Joi.number().integer().min(0).prefs({ convert: convert }).required(),
    attributes: Joi.array()
        .items(
            Joi.number()
                .integer()
                .min(0)
                .prefs({ convert: convert })
                .required()
        )
        .min(0)
        .unique()
        .prefs({ convert: convert })
        .required(),
    comment: Joi.string()
        .trim()
        .min(10)
        .max(250)
        .prefs({ convert: convert })
        .required(),
}).unknown(true)

module.exports = rating_aspect_validator