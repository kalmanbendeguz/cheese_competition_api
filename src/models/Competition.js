const { Schema: Schema, Schema: { Types: { Decimal128, Mixed }, }, } = require('mongoose')
const db = require('../config/db')
const File_Schema = require('./schemas/File')

const Competition_Schema = new Schema(
    {
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
        entry_opened: {
            type: Boolean,
            default: false,
        },
        last_entry_open_date: {
            type: Date,
        },
        last_entry_close_date: {
            type: Date,
        },
        competition_opened: {
            type: Boolean,
            default: false,
        },
        last_competition_open_date: {
            type: Date,
        },
        last_competition_close_date: {
            type: Date,
        },
        archived: {
            type: Boolean,
            default: false,
        },
        archival_date: {
            type: Date,
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
            type: File_Schema,
        },
        ignore_extreme_values: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        minimize: false,
        strict: true,
        strictQuery: false,
        validateBeforeSave: true,
    }
)

const Competition_Model = db.model('Competition', Competition_Schema)

module.exports = Competition_Model
