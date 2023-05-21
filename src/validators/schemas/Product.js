const Joi = require('joi')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')
const forbidden_id_parts = require('../../static/forbidden_id_parts')

module.exports = Joi.object({
    competition_id: Joi.object().instance(ObjectId).required(),
    competitor_id: Joi.object().instance(ObjectId).required(),
    public_id: Joi.string().trim().required().pattern(new RegExp(`^((?!${forbidden_id_parts.join('|')})[a-z]{3})([0-9]{3})$`)).prefs({ convert: false }),
    secret_id: Joi.string().trim().required().pattern(new RegExp(`^((?!${forbidden_id_parts.join('|')})[a-z]{3})([0-9]{3})$`)).prefs({ convert: false }),
    product_name: Joi.string().trim().required().min(3).max(25).prefs({ convert: false }),
    anonimized_product_name: Joi.string().trim().optional().min(3).max(25).prefs({ convert: false }),
    factory_name: Joi.string().trim().required().min(3).max(80).prefs({ convert: false }),
    maturation_time_type: Joi.string().trim().required().valid('fresh', 'matured').prefs({ convert: false }),
    maturation_time_quantity: Joi.when('maturation_time_type', {
        is: 'matured',
        then: Joi.number().integer().positive().required(),
        otherwise: Joi.forbidden(),
    }),
    maturation_time_unit: Joi.when('maturation_time_type', {
        is: 'matured',
        then: Joi.string().trim().required().valid('day', 'week', 'month').prefs({ convert: false }),
        otherwise: Joi.forbidden(),
    }),
    milk_type: Joi.string().trim().required().min(1).prefs({ convert: false }), // should validate based on tree
    product_category_list: Joi.array().items( // should validate based on tree
        Joi.string().trim().min(1).prefs({ convert: false })
    ).required().min(1),
    product_description: Joi.string().trim().required().min(25).max(1000).prefs({ convert: false }),
    anonimized_product_description: Joi.string().trim().optional().min(25).max(1000).prefs({ convert: false }),
    approved: Joi.boolean().required(),
    approval_type: Joi.when('approved', {
        is: true,
        then: Joi.string().trim().required().valid('payment', 'association_member', 'bypass').prefs({ convert: false }),
        otherwise: Joi.forbidden(),
    }),
    handed_in: Joi.boolean().required()
}).unknown(true)