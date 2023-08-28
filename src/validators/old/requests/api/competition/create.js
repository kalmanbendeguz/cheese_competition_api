const Joi = require('joi')
const valid_currencies = require('../../../../static/valid_currencies.json')

const product_category_tree_validator = (value, helpers) => {
    const is_subtree = require('../../../../helpers/is_subtree')
    const default_product_category_tree = require('../../../../static/product_category_tree.json')

    if (is_subtree(value, default_product_category_tree)) {
        return value
    } else {
        throw new Error('provided_product_category_tree_is_not_a_subtree_of_original_product_category_tree')
    }
}

const object_schema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: false })
        .required(),
    place: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: false })
        .required(),
    // creation_date // Defaults to Date.now
    entry_opened: Joi.boolean().optional(), // If not provided, defaults to false
    // last_entry_open_date // If entry_opened is set to true, then it will default to Date.now, else defaults to undefined
    // last_entry_close_date // Defaults to undefined
    competition_opened: Joi.boolean().optional(), // If not provided, defaults to false
    // last_competition_open_date // If competition_opened is set to true, then it will default to Date.now, else defaults to undefined
    // last_competition_close_date // Defaults to undefined
    // archived // Defaults to false
    // archival_date // Defaults to undefined
    payment_needed: Joi.boolean().optional(), // If not set, defaults to false
    association_members_need_to_pay: Joi.when('payment_needed', {
        is: true,
        then: Joi.boolean().optional(), // If not set, defaults to true
        otherwise: Joi.forbidden(),
    }),
    entry_fee_amount: Joi.when('payment_needed', {
        is: true,
        then: Joi.number().positive().optional(), // Important: .number() also matches strings that can be converted to numbers!
        otherwise: Joi.forbidden(),
    }),
    entry_fee_currency: Joi.string()
        .valid(...valid_currencies)
        .when('payment_needed', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),
    product_category_tree: Joi.custom(product_category_tree_validator).optional(), // If not provided, defaults to default tree.
    certificate_template: File_Validator.optional(), // If not provided, defaults to default template.
    ignore_extreme_values: Joi.boolean().optional(), // If not provided, defaults to false.
}).required()

const array_schema = Joi.array().items(object_schema).min(1).required()

const alternatives_schema = Joi.alternatives().try(object_schema, array_schema)

module.exports = alternatives_schema