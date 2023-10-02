const Joi = require('joi')

const rating_sheet_validator = (convert) => Joi.object({
    id: Joi.number()
        .integer()
        .min(0)
        .prefs({ convert: convert })
        .required(),
    sheet: Joi.array()
        .items(
            Joi.object({
                title: Joi.number()
                    .integer()
                    .min(0)
                    .prefs({ convert: convert })
                    .required(),
                score: Joi.number().integer().min(0).required(),
                attributes: Joi.array()
                    .items(
                        Joi.number()
                            .integer()
                            .min(0)
                            .prefs({ convert: convert })
                    )
                    .min(0)
                    .unique()
                    .required()
            })
        )
        .min(1)
        .unique((a, b) => a.title === b.title)
        .required()
}).unknown(true)

module.exports = rating_sheet_validator