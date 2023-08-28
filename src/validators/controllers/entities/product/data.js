const Joi = require('joi')
const forbidden_id_parts = require('../../../../static/forbidden_id_parts.json')

const data_validator = Joi.object({
    competition_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
    competitor_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
    public_id: Joi.string()
        .trim()
        .optional()
        .pattern(
            new RegExp(
                `^((?!${forbidden_id_parts.join('|')})[a-z]{3})([0-9]{3})$`
            )
        )
        .prefs({ convert: false }),
    secret_id: Joi.string()
        .trim()
        .optional()
        .pattern(
            new RegExp(
                `^((?!${forbidden_id_parts.join('|')})[a-z]{3})([0-9]{3})$`
            )
        )
        .prefs({ convert: false }),

    product_category_id: Joi.string()
        .trim()
        .optional()
        .pattern(
            new RegExp(
                `^0(?:_[1-9][0-9]*)*$`
            )
        )
        .prefs({ convert: false }),
    product_name: Joi.string()
        .trim()
        .optional()
        .min(3)
        .max(50)
        .prefs({ convert: false }),
    anonimized_product_name: Joi.string()
        .trim()
        .optional()
        .min(3)
        .max(50)
        .prefs({ convert: false }),
    factory_name: Joi.string()
        .trim()
        .optional()
        .min(3)
        .max(100)
        .prefs({ convert: false }),
    product_description: Joi.string()
        .trim()
        .optional()
        .min(25)
        .max(1000)
        .prefs({ convert: false }),
    anonimized_product_description: Joi.string()
        .trim()
        .optional()
        .min(25)
        .max(1000)
        .prefs({ convert: false }),

    maturation_time_type: Joi.string()
        .trim()
        .optional()
        .valid('fresh', 'matured')
        .prefs({ convert: false }),
    approved: Joi.boolean().optional(),

    maturation_time_quantity: Joi.number().integer().positive().optional(),
    maturation_time_unit: Joi.string()
        .trim()
        .valid('day', 'week', 'month')
        .prefs({ convert: false })
        .optional(),
    approval_type: Joi.string()
        .trim()
        .valid('payment', 'association_member', 'bypass')
        .prefs({ convert: false })
        .optional(),

    handed_in: Joi.boolean().optional(),
})

module.exports = data_validator