const Joi = require('joi')
const { mongoose: { Types: { ObjectId, Decimal128 }, }, } = require('mongoose')
const valid_currencies = require('../../../static/valid_currencies.json')

const entry_fee_payment_validator = Joi.object({

    product_ids: Joi.array()
        .items(Joi.object().instance(ObjectId))
        .min(1)
        .required(),
    pos_transaction_id: Joi.string()
        .trim()
        .lowercase()
        .length(32)
        .alphanum()
        .prefs({ convert: false })
        .required(),
    confirm_payment_id: Joi.string()
        .trim()
        .lowercase()
        .length(32)
        .alphanum()
        .prefs({ convert: false })
        .required(),

    pending: Joi.boolean().required(),

    barion_payment_id: Joi.string()
        .trim()
        .min(1)
        .prefs({ convert: false })
        .when('pending', {
            is: false,
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),
    barion_transaction_id: Joi.string()
        .trim()
        .min(1)
        .prefs({ convert: false })
        .when('pending', {
            is: false,
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),
    amount: Joi.object().instance(Decimal128).when('pending', {
        is: false,
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    currency: Joi.string().valid(...valid_currencies).when('pending', {
        is: false,
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    expiring_started: Joi.date().when('pending', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),

}).unknown(true)

module.exports = entry_fee_payment_validator