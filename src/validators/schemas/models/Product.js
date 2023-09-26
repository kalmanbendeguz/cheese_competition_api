const Joi = require('joi')
const { mongoose: { Types: { ObjectId }, }, } = require('mongoose')
const forbidden_id_parts = require('../../../static/forbidden_id_parts.json')
const Maturation_Time_Validator = require('../fields/Product/Maturation_Time')
const State_Validator = require('../fields/Product/State')

const product_validator = Joi.object({
    competition_id: Joi.object().instance(ObjectId).required(),
    user_id: Joi.object().instance(ObjectId).optional(),
    entry_fee_payment_id: Joi.object().instance(ObjectId).optional(),

    public_id: Joi.string()
        .trim()
        .required()
        .pattern(
            new RegExp(
                `^((?!${forbidden_id_parts.join('|')})[a-z]{3})([0-9]{3})$`
            )
        )
        .prefs({ convert: false }),
    secret_id: Joi.string()
        .trim()
        .required()
        .pattern(
            new RegExp(
                `^((?!${forbidden_id_parts.join('|')})[a-z]{3})([0-9]{3})$`
            )
        )
        .prefs({ convert: false }),

    product_category_id: Joi.string()
        .trim()
        .required()
        .pattern(
            new RegExp(
                `^0(?:_[1-9][0-9]*)*$`
            )
        )
        .prefs({ convert: false }),
    product_name: Joi.string()
        .trim()
        .required()
        .min(3)
        .max(100)
        .prefs({ convert: false }),
    anonimized_product_name: Joi.string()
        .trim()
        .optional()
        .min(3)
        .max(100)
        .prefs({ convert: false }),
    factory_name: Joi.string()
        .trim()
        .required()
        .min(3)
        .max(100)
        .prefs({ convert: false }),
    product_description: Joi.string()
        .trim()
        .required()
        .min(25)
        .max(1000)
        .prefs({ convert: false }),
    anonimized_product_description: Joi.string()
        .trim()
        .optional()
        .min(25)
        .max(1000)
        .prefs({ convert: false }),

    maturation_time: Maturation_Time_Validator.required(),
    state: State_Validator.required(),
}).unknown(true)

module.exports = product_validator