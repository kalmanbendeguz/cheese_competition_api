const Joi = require('joi')

const rating_sheet_validator = Joi.object({
    id: Joi.string()
        .trim()
        .pattern(
            new RegExp(
                `^[1-9][0-9]*$`
            )
        )
        .prefs({ convert: false })
        .required(),
    sheet: Joi.array()
        .items(
            Joi.object({
                title: Joi.string()
                    .trim()
                    .pattern(
                        new RegExp(
                            `^[1-9][0-9]*$`
                        )
                    )
                    .prefs({ convert: false })
                    .required(),
                score: Joi.number().integer().min(0).required(),
                attributes: Joi.array()
                    .items(
                        Joi.string()
                            .trim()
                            .pattern(
                                new RegExp(
                                    `^[1-9][0-9]*$`
                                )
                            )
                            .prefs({ convert: false })
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