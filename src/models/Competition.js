const config = require('../config/schema')
const db = require('../config/db')
const { Schema: Schema, Schema: { Types: { Decimal128, Mixed }, }, } = require('mongoose')

const Competition_Schema = new Schema(
    {
        // Cannot be changed
        creation_date: {
            type: Date,
        },

        // Can be changed independently
        name: {
            type: String,
        },
        place: {
            type: String,
        },
        ignore_extreme_values: {
            type: Boolean,
        },
        certificate_template: {
            type: Mixed,
        },

        // Can be changed independently, but something depends on it
        product_category_tree: {
            type: Mixed,
        },
        archived: {
            type: Boolean,
        },
        payment_needed: {
            type: Boolean,
        },

        // Can be changed, but depends on something AND something depends on it
        rating_map: {
            type: Mixed,
        },
        entry_opened: {
            type: Boolean,
        },
        competition_opened: {
            type: Boolean,
        },

        // Can be changed but depends on something
        rating_sheets: {
            type: [
                {
                    type: Mixed,
                },
            ],
        },
        association_members_need_to_pay: {
            type: Boolean,
        },
        entry_fee_amount: {
            type: Decimal128,
        },
        entry_fee_currency: {
            type: String,
        },

        // Can be changed, but only internally because it depends on something
        archival_date: {
            type: Date,
        },
        last_entry_open_date: {
            type: Date,
        },
        last_entry_close_date: {
            type: Date,
        },
        last_competition_open_date: {
            type: Date,
        },
        last_competition_close_date: {
            type: Date,
        },
    },
    config.model_schema_options
)

const Competition_Model = db.model(
    'Competition',
    Competition_Schema
)

module.exports = Competition_Model