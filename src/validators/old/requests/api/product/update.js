const Joi = require('joi')
const valid_milk_types = require('../../../../static/valid_milk_types.json')

const data_validator = Joi.object({
    query: Joi.object({
        _id: Joi.any().optional(),
        competition_id: Joi.any().optional(),
        competitor_id: Joi.any().optional(),
        public_id: Joi.any().optional(),
        secret_id: Joi.any().optional(),
        product_name: Joi.any().optional(),
        anonimized_product_name: Joi.any().optional(),
        factory_name: Joi.any().optional(),
        maturation_time_type: Joi.any().optional(),
        maturation_time_quantity: Joi.any().optional(),
        maturation_time_unit: Joi.any().optional(),
        milk_type: Joi.any().optional(),
        product_category_id: Joi.any().optional(),
        product_description: Joi.any().optional(),
        anonimized_product_description: Joi.any().optional(),
        approved: Joi.any().optional(),
        approval_type: Joi.any().optional(),
        handed_in: Joi.any().optional(),
    }).required(),
    body: Joi.object({
        // competition_id // Forbidden to update.
        // competitor_id // Forbidden to update.
        // public_id // // Forbidden to update.
        // secret_id // // Forbidden to update.

        product_name: Joi.string()
            .trim()
            .min(3)
            .max(25)
            .prefs({ convert: false })
            .optional(),

        anonimized_product_name: Joi.string()
            .trim()
            .min(3)
            .max(25)
            .prefs({ convert: false })
            .optional(),

        factory_name: Joi.string()
            .trim()
            .min(3)
            .max(80)
            .prefs({ convert: false })
            .optional(),

        maturation_time_type: Joi.string()
            .trim()
            .valid('fresh', 'matured')
            .prefs({ convert: false })
            .optional(),

        maturation_time_quantity: Joi.when('maturation_time_type', {
            is: 'matured',
            then: Joi.number().integer().positive().required(),
            otherwise: Joi.forbidden()
        }),

        maturation_time_unit: Joi.when('maturation_time_type', {
            is: 'matured',
            then: Joi.string()
                .trim()
                .valid('day', 'week', 'month')
                .prefs({ convert: false })
                .required(),
            otherwise: Joi.forbidden(),
        }),

        milk_type: Joi.string().trim().valid(...valid_milk_types).prefs({ convert: false }).optional(),

        product_category_id: Joi.string()
            .trim()
            .min(1)
            .prefs({ convert: false })
            .optional(),

        product_description: Joi.string()
            .trim()
            .min(25)
            .max(1000)
            .prefs({ convert: false })
            .optional(),

        anonimized_product_description: Joi.string()
            .trim()
            .min(25)
            .max(1000)
            .prefs({ convert: false })
            .optional(),

        approved: Joi.boolean().optional(),

        approval_type: Joi.when('approved', {
            is: true,
            then: Joi.string()
                .trim()
                .valid('bypass', 'association_member', 'payment')
                .prefs({ convert: false })
                .required(),
            otherwise: Joi.forbidden()
        }),

        handed_in: Joi.boolean().optional(),
    }).required(),
}).required()

module.exports = data_validator