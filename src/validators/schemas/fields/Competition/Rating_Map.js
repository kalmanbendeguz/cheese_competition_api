const Joi = require('joi')

const rating_map_validator = Joi.object().pattern(
    Joi.string()
        .trim()
        .pattern(
            new RegExp(
                `^0(?:_[1-9][0-9]*)*$`
            )
        )
        .prefs({ convert: false })
        .required(),
    Joi.string()
        .trim()
        .pattern(
            new RegExp(
                `^[1-9][0-9]*$`
            )
        )
        .prefs({ convert: false })
        .required()
).min(1).unknown(true)


module.exports = rating_map_validator