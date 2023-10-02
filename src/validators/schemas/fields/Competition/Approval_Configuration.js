const Joi = require('joi')
const valid_currencies = require('../../../../static/valid_currencies.json')
const { mongoose: { Types: { Decimal128 }, }, } = require('mongoose')

const approval_configuration_validator = (convert) => Joi.object({

    payment_needed: Joi.boolean().prefs({ convert: convert }).required(),

    association_members_need_to_pay: Joi.boolean().when('payment_needed', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.optional(),
    }).prefs({ convert: convert }),

    entry_fee_amount: (convert ? Joi.alternatives().try(
        Joi.number().min(0),
        Joi.object().instance(Decimal128),
    ) : Joi.object().instance(Decimal128))
        .when('payment_needed', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.optional(),
        })
        .prefs({ convert: convert }),

    entry_fee_currency: Joi.string().valid(...valid_currencies)
        .when('payment_needed', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.optional(),
        })
        .prefs({ convert: convert }),

}).unknown(true)

module.exports = approval_configuration_validator