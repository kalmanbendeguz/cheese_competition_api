

const Joi = require('joi')

const maturation_time_validator = (convert) => Joi.object({

    approved: Joi.boolean().prefs({ convert: convert }).required(),

    approval_type: Joi.string()
        .trim()
        .valid('payment', 'association_member', 'bypass')
        .prefs({ convert: convert })
        .when('approved', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.optional(),
        }),

    handed_in: Joi.boolean()
        .prefs({ convert: convert })
        .required()
        .when('approved', {
            is: false,
            then: Joi.valid(false),
        }),

}).unknown(true)

module.exports = maturation_time_validator