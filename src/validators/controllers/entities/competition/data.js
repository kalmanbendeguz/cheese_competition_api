const Joi = require('joi')
const File_Validator = require('../../../schemas/fields/File')
const Rating_Sheet_Validator = require('../../../schemas/fields/Rating_Sheet')
const Product_Category_Tree_Validator = require('../../../schemas/fields/Product_Category_Tree')
const Rating_Map_Validator = require('../../../schemas/fields/Rating_Map')
const valid_currencies = require('../../../../static/valid_currencies.json')

const data_validator = Joi.object({

    // creation_date // Internal

    // Can be changed independently
    name: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: false })
        .optional(),
    place: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: false })
        .optional(),
    ignore_extreme_values: Joi.boolean().optional(),
    certificate_template: File_Validator.optional(),

    // Can be changed independently, but something depends on it
    product_category_tree: Product_Category_Tree_Validator.optional(),
    archived: Joi.boolean().optional(),
    payment_needed: Joi.boolean().optional(),

    // Can be changed, but depends on something AND something depends on it
    rating_map: Rating_Map_Validator.optional(), // This has further validation at the bottom.
    entry_opened: Joi.boolean().optional(),
    competition_opened: Joi.boolean().optional(),

    // Can be changed but depends on something
    rating_sheets: Joi.alternatives().try(
        Joi.array()
            .items(Rating_Sheet_Validator)
            .unique((a, b) => a.id === b.id)
            .min(1),
        Joi.object({
            method: Joi.string.valid('add', 'remove').required(),
            array: Joi.array()
                .items(Rating_Sheet_Validator)
                .unique((a, b) => a.id === b.id)
                .min(1)
                .required(),
        }),
    ).optional(),
    association_members_need_to_pay: Joi.boolean().optional(),
    entry_fee_amount: Joi.number().min(0).optional(),
    entry_fee_currency: Joi.string().valid(...valid_currencies).optional(),


    // Can be changed, but only internally because it depends on something
    // Time constraints are the controller's responsibility.
    // archival_date // Internal
    // last_entry_open_date // Internal
    // last_entry_close_date // Internal
    // last_competition_open_date // Internal
    // last_competition_close_date // Internal
})

module.exports = data_validator