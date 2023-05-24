const Joi = require('joi')

const object_schema = Joi.object({
    name: Joi.string().trim().min(1).max(1000).prefs({ convert: false }).required(),
    place: Joi.string().trim().min(1).max(1000).prefs({ convert: false }).required(),
    // creation_date // defaults to Date.now
    entry_opened: Joi.boolean().optional(), // if not set, defaults to false
    // last_entry_open_date // defaults to undefined
    // last_entry_close_date // defaults to undefined
    competition_opened: Joi.boolean().optional(), // if not set, defaults to false
    // last_competition_open_date // defaults to undefined
    // last_competition_close_date // defaults to undefined
    // archived // defaults to false
    // archival_date // defaults to undefined  
    payment_needed: Joi.boolean().optional(), // if not set, defaults to false
    association_members_need_to_pay: Joi.boolean().optional(), // if not set, defaults to true
    entry_fee_amount: Joi.when('payment_needed', {
        is: true,
        then: Joi.object().instance(Decimal128).required(),
        otherwise: Joi.forbidden()
    }),
    entry_fee_currency: Joi.string().valid('HUF', 'EUR', 'USD').when('payment_needed', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.forbidden()
    }),
    product_category_tree: Joi.any().optional(), // if not provided, defaults to default tree. needs better validation.
    certificate_template: Joi.any().optional(), // if not provided, defaults to default template. needs better validation.
    ignore_extreme_values: Joi.boolean().optional(), // if not set, defaults to false
}).required()

const array_schema = Joi.array().items(object_schema).min(1).required()

module.exports = Joi.alternatives().try(
    object_schema,
    array_schema
)

