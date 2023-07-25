const Joi = require('joi')
const { mongoose: { Types: { Decimal128 }, }, } = require('mongoose')
const File_Validator = require('./File')
const valid_currencies = require('../../static/valid_currencies.json')

const product_category_tree_validator = (value, helpers) => {
    const default_product_category_tree = require('../../static/product_category_tree.json')
    const is_subtree = require('../../helpers/is_subtree')

    if (is_subtree(value, default_product_category_tree)) {
        return value
    } else {
        throw new Error('product_category_tree_must_be_a_subtree_of_the_default_product_category_tree')
    }
}

const competition_validator = Joi.object({
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
    creation_date: Joi.date().required(),
    entry_opened: Joi.boolean().required(),
    last_entry_open_date: Joi.date()
        .min(Joi.ref('creation_date'))
        .when('entry_opened', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.optional(),
        }),
    last_entry_close_date: Joi.date().when('entry_opened', {
        is: true,
        then: Joi.date().less(Joi.ref('last_entry_open_date')).optional(),
        otherwise: Joi.when('last_entry_open_date', {
            is: Joi.exist(),
            then: Joi.date()
                .greater(Joi.ref('last_entry_open_date'))
                .required(),
            otherwise: Joi.forbidden(),
        }),
    }),
    competition_opened: Joi.boolean().required(),
    last_competition_open_date: Joi.date()
        .min(Joi.ref('creation_date'))
        .when('competition_opened', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.optional(),
        }),
    last_competition_close_date: Joi.date().when('competition_opened', {
        is: true,
        then: Joi.date().less(Joi.ref('last_competition_open_date')).optional(),
        otherwise: Joi.when('last_competition_open_date', {
            is: Joi.exist(),
            then: Joi.date()
                .greater(Joi.ref('last_competition_open_date'))
                .required(),
            otherwise: Joi.forbidden(),
        }),
    }),
    archived: Joi.boolean().required().when('/', {
        is: Joi.object({
            entry_opened: Joi.valid(false),
            competition_opened: Joi.valid(false)
        }).unknown(true),
        then: Joi.any(),
        otherwise: Joi.valid(false)
    }),
    archival_date: Joi.date()
        .min(Joi.ref('creation_date'))
        .when('last_entry_close_date',{
            is: Joi.exist(),
            then: Joi.min(Joi.ref('last_entry_close_date')),
        })
        .when('last_competition_close_date',{
            is: Joi.exist(),
            then: Joi.min(Joi.ref('last_competition_close_date')),
        })
        .when('archived', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),
    payment_needed: Joi.boolean().required(),
    association_members_need_to_pay: Joi.boolean().when('payment_needed', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    entry_fee_amount: Joi.when('payment_needed', {
        is: true,
        then: Joi.object().instance(Decimal128).required(),
        otherwise: Joi.forbidden(),
    }),
    entry_fee_currency: Joi.string()
        .valid(...valid_currencies)
        .when('payment_needed', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),
    product_category_tree: Joi.custom(product_category_tree_validator).required(),
    certificate_template: File_Validator.required(),
    ignore_extreme_values: Joi.boolean().required(),
}).unknown(true)

module.exports = competition_validator