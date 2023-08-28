const Joi = require('joi')
const { mongoose: { Types: { Decimal128 }, }, } = require('mongoose')
const File_Validator = require('../fields/File')
const Rating_Sheet_Validator = require('../fields/Rating_Sheet')
const Product_Category_Tree_Validator = require('../fields/Product_Category_Tree')
const Rating_Map_Validator = require('../fields/Rating_Map')
const valid_currencies = require('../../../static/valid_currencies.json')

const competition_validator = Joi.object({

    // Cannot be changed
    creation_date: Joi.date().required(),

    // Can be changed independently
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
    ignore_extreme_values: Joi.boolean().required(),
    certificate_template: File_Validator.required(),

    // Can be changed independently, but something depends on it
    product_category_tree: Product_Category_Tree_Validator.required(),
    archived: Joi.boolean().required(),
    payment_needed: Joi.boolean().required(),

    // Can be changed, but depends on something AND something depends on it
    rating_map: Rating_Map_Validator.required(), // This has further validation at the bottom.
    entry_opened: Joi.boolean()
        .when('archived', {
            is: true,
            then: Joi.valid(false),
        }).required(),
    competition_opened: Joi.boolean()
        .when('archived', {
            is: true,
            then: Joi.valid(false),
        }).required(),

    // Can be changed but depends on something
    rating_sheets: Joi.array()
        .items(Rating_Sheet_Validator)
        .unique((a,b) => a.id === b.id)
        .min(1)
        .required(),
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
    entry_fee_currency: Joi.when('payment_needed', {
        is: true,
        then: Joi.string().valid(...valid_currencies).required(),
        otherwise: Joi.forbidden(),
    }),

    // Can be changed, but only internally because it depends on something
    // Time constraints are the controller's responsibility.
    archival_date: Joi.date().when('archived', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    last_entry_open_date: Joi.date().when('entry_opened', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    last_entry_close_date: Joi.date().when('entry_opened', {
        is: true,
        then: Joi.forbidden(),
        otherwise: Joi.optional()
    }),
    last_competition_open_date: Joi.date().when('competition_opened', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.forbidden(),
    }),
    last_competition_close_date: Joi.date().when('competition_opened', {
        is: true,
        then: Joi.forbidden(),
        otherwise: Joi.optional()
    }),
})
    .custom((competition, helpers) => {
        // Only requirement about rating_map: the root (with node_id of 0) should have a matching record.
        if(!('0' in competition.rating_map)){
            throw new Error('rating_map_does_not_have_a_record_for_root_category')
        }
        return competition
    })
    .custom((competition, helpers) => {
        // rating_sheets should have a matching sheet for each rating_map value.
        const rating_map_sheet_ids = [...new Set(Object.values(competition.rating_map))]
        const rating_sheet_ids = competition.rating_sheets.map(rating_sheet => rating_sheet.id)
        if (rating_map_sheet_ids.some(rating_sheet_id => !rating_sheet_ids.includes(rating_sheet_id))) {
            throw new Error('rating_sheets_does_not_cover_all_rating_map_rating_sheet_ids')
        }
        return competition
    })
    .unknown(true)

module.exports = competition_validator