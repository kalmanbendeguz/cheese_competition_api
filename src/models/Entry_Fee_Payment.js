const config = require('../config/schema')
const db = require('../config/db')
const { Schema: Schema, Schema: { Types: { ObjectId, Decimal128 }, }, } = require('mongoose')
const User_Model = require('./User')
const Competition_Model = require('./Competition')

const Entry_Fee_Payment_Schema = new Schema(
    {
        user_id: {
            type: ObjectId,
            ref: User_Model,
        },
        competition_id: {
            type: ObjectId,
            ref: Competition_Model,
        },
        pos_transaction_id: {
            type: String,
        },
        confirm_payment_id: {
            type: String,
        },
        pending: {
            type: Boolean,
        },
        barion_payment_id: {
            type: String,
        },
        barion_transaction_id: {
            type: String,
        },
        amount: {
            type: Decimal128,
        },
        currency: {
            type: String,
        },
        expiring_started: {
            type: Date,
            default: Date.now,
            expires: 15 * 60,
        },
    },
    config.model_schema_options
)

const Entry_Fee_Payment_Model = db.model(
    'Entry_Fee_Payment',
    Entry_Fee_Payment_Schema
)

module.exports = Entry_Fee_Payment_Model