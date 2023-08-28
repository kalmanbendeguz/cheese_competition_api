const Joi = require('joi')

const filter_validator = Joi.object({
    _id: Joi.any().optional(),
    creation_date: Joi.any().optional(),
    name: Joi.any().optional(),
    place: Joi.any().optional(),
    ignore_extreme_values: Joi.any().optional(),
    certificate_template: Joi.any().optional(),
    product_category_tree: Joi.any().optional(),
    archived: Joi.any().optional(),
    payment_needed: Joi.any().optional(),
    rating_map: Joi.any().optional(),
    entry_opened: Joi.any().optional(),
    competition_opened: Joi.any().optional(),
    rating_sheets: Joi.any().optional(),
    association_members_need_to_pay: Joi.any().optional(),
    entry_fee_amount: Joi.any().optional(),
    entry_fee_currency: Joi.any().optional(),
    archival_date: Joi.any().optional(),
    last_entry_open_date: Joi.any().optional(),
    last_entry_close_date: Joi.any().optional(),
    last_competition_open_date: Joi.any().optional(),
    last_competition_close_date: Joi.any().optional(),
})

module.exports = filter_validator