const Joi = require('joi')

const maturation_time_validator = (convert) => Joi.object({

    maturation_time_type: Joi.string()
        .trim()
        .valid('fresh', 'matured')
        .prefs({ convert: convert })
        .required(),

    maturation_time_quantity: Joi.number()
        .integer()
        .positive()
        .prefs({ convert: convert })
        .when('maturation_time_type', {
            is: 'matured',
            then: Joi.required(),
            otherwise: Joi.optional(),
        }),

    maturation_time_unit: Joi.string()
        .trim()
        .required()
        .valid('day', 'week', 'month', 'year')
        .prefs({ convert: convert })
        .when('maturation_time_type', {
            is: 'matured',
            then: Joi.required(),
            otherwise: Joi.optional(),
        }),

}).unknown(true)

module.exports = maturation_time_validator