const Joi = require('joi')

const object_schema = Joi.object({
    competition_id: Joi.string().trim().min(1).prefs({ convert: false }).required(),

    competitor_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),

    //public_id
    //secret_id

    product_name: Joi.string().trim().min(3).max(25).prefs({ convert: false }).required(),

    anonimized_product_name: Joi.string().trim().min(3).max(25).prefs({ convert: false }).optional(),

    factory_name: Joi.string().trim().min(3).max(80).prefs({ convert: false }).required(),

    maturation_time_type: Joi.string().trim().valid('fresh', 'matured').prefs({ convert: false }).required(),

    maturation_time_quantity: Joi.when('maturation_time_type', {
        is: 'matured',
        then: Joi.number().integer().positive().required(),
        otherwise: Joi.forbidden(),
    }),

    maturation_time_unit: Joi.when('maturation_time_type', {
        is: 'matured',
        then: Joi.string().trim().valid('day', 'week', 'month').prefs({ convert: false }).required(),
        otherwise: Joi.forbidden(),
    }),

    milk_type: Joi.string().trim().min(1).prefs({ convert: false }).required(), // should validate based on json tree!!!!!

    product_category_list: Joi.array().items( // should validate based on json tree!!!!! 
        Joi.string().trim().min(1).prefs({ convert: false })
    ).min(1).required(),

    product_description: Joi.string().trim().min(25).max(1000).prefs({ convert: false }).required(),

    approved: Joi.boolean().optional(),

    approval_type : Joi.when('approved', {
        is: true,
        then: Joi.string().trim().required().valid('bypass').prefs({ convert: false }),
        otherwise: Joi.forbidden(),
    }),

    anonimized_product_description: Joi.string().trim().min(25).max(1000).prefs({ convert: false }).optional(),

    handed_in: Joi.boolean().optional()
}).required()

const array_schema = Joi.array().items(object_schema).min(1).required()

module.exports = Joi.alternatives().try(
    object_schema,
    array_schema
)

