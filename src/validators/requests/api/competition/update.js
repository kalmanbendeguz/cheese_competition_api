const Joi = require('joi')
const File_Validator = require('../../../schemas/File')

const data_validator = Joi.object({
    query: Joi.object({
        _id: Joi.any().optional(),
        name: Joi.any().optional(),
        place: Joi.any().optional(),
        creation_date: Joi.any().optional(),
        entry_opened: Joi.any().optional(),
        last_entry_open_date: Joi.any().optional(),
        last_entry_close_date: Joi.any().optional(),
        competition_opened: Joi.any().optional(),
        last_competition_open_date: Joi.any().optional(),
        last_competition_close_date: Joi.any().optional(),
        archived: Joi.any().optional(),
        archival_date: Joi.any().optional(),
        payment_needed: Joi.any().optional(),
        association_members_need_to_pay: Joi.any().optional(),
        entry_fee_amount: Joi.any().optional(),
        entry_fee_currency: Joi.any().optional(),
        // product_category_tree: Joi.any().optional(), // ez alapján ne lehessen keresni
        // certificate_template: Joi.any().optional(), // és ez alapján se
        ignore_extreme_values: Joi.any().optional(),
    }).required(),
    body: Joi.object({
        name: Joi.string().trim().min(1).max(1000).prefs({ convert: false }).optional(),
        place: Joi.string().trim().min(1).max(1000).prefs({ convert: false }).optional(),
        // creation_date: Joi.date().required() // this is forbidden
        entry_opened: Joi.boolean().optional(),
        // last_entry_open_date // forbidden
        // last_entry_close_date // forbidden
        competition_opened: Joi.boolean().optional(),
        // last_competition_open_date // forbidden
        // last_competition_close_date // forbidden
        archived: Joi.boolean().optional(),
        // archival_date // forbidden
        payment_needed: Joi.boolean().optional(),
        association_members_need_to_pay: Joi.boolean().optional(),
        entry_fee_amount: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
        entry_fee_currency: Joi.string().valid('HUF', 'EUR', 'USD').optional(),
        // product_category_tree: Joi.any().optional(), // ezt nem szabad módosítani.
        certificate_template: File_Validator.optional(), // maybe this will come in a different format in the request. todo check!
        ignore_extreme_values: Joi.boolean().optional(),
    }).required()
}).required()

module.exports = data_validator