const { Schema: Schema, Schema: { Types: { Decimal128, Mixed } } } = require('mongoose')
const db = require('../config/db')

const Competition_Schema = new Schema({
    name: {
        type: String,
    },
    place: {
        type: String,
    },
    creation_date: {
        type: Date,
        default: Date.now,
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
    archival_date: {
        type: Date,
    },
    archived: {
        type: Boolean,
        default: false,
    },
    entry_opened: {
        type: Boolean,
        default: false,
    },
    competition_opened: {
        type: Boolean,
        default: false,
    },
    payment_needed: {
        type: Boolean,
        default: false,
    },
    association_members_need_to_pay: {
        type: Boolean,
        default: true,
    },
    entry_fee_amount: {
        type: Decimal128,
    },
    entry_fee_currency: {
        type: String,
    },
    product_category_tree: {
        type: Mixed,
    },
    certificate_template: {
        type: Mixed
    },
    ignore_extreme_values: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
    minimize: false,
    strict: true,
    strictQuery: false,
    validateBeforeSave: true
})

const Competition_Model = db.model(
    'Competition',
    Competition_Schema
)

module.exports = Competition_Model