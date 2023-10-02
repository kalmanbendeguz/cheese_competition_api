const Joi = require('joi')
const forbidden_id_parts = require('../../../../static/forbidden_id_parts.json')
const Maturation_Time_Validator = require('../../../schemas/fields/Product/Maturation_Time')
const State_Validator = require('../../../schemas/fields/Product/State')

const content_validator = Joi.object({
    competition_id: Joi.string().trim().min(1).optional(),
    user_id: Joi.string().trim().min(1).optional(),
    entry_fee_payment_id: Joi.string().trim().min(1).optional(),

    public_id: Joi.string()
        .trim()
        .pattern(
            new RegExp(
                `^((?!${forbidden_id_parts.join('|')})[a-z]{3})([0-9]{3})$`
            )
        )
        .optional(),
    secret_id: Joi.string()
        .trim()
        .pattern(
            new RegExp(
                `^((?!${forbidden_id_parts.join('|')})[a-z]{3})([0-9]{3})$`
            )
        )
        .optional(),

    product_category_id: Joi.string()
        .trim()
        .pattern(
            new RegExp(
                `^0(_(0|[1-9][0-9]*))*$`
            )
        )
        .optional(),
    product_name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .prefs({ convert: true })
        .optional(),
    anonimized_product_name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .prefs({ convert: true })
        .optional(),
    factory_name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .prefs({ convert: true })
        .optional(),
    product_description: Joi.string()
        .trim()
        .min(20)
        .max(1000)
        .prefs({ convert: true })
        .optional(),
    anonimized_product_description: Joi.string()
        .trim()
        .min(20)
        .max(1000)
        .prefs({ convert: true })
        .optional(),

    maturation_time: Maturation_Time_Validator(true).optional(),
    state: State_Validator(true).optional(),
})

module.exports = content_validator