const {
    Schema: Schema,
    Schema: {
        Types: { ObjectId, Decimal128 },
    },
} = require('mongoose')
const db = require('../config/db')
const Product_Model = require('./Product')

const Entry_Fee_Payment_Schema = new Schema(
    {
        product_ids: {
            type: [
                {
                    type: ObjectId,
                    ref: Product_Model,
                },
            ],
        },
        pending: {
            type: Boolean,
            default: true,
        },
        expiring_started: {
            type: Date,
            default: Date.now,
            expires: 15 * 60,
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
        pos_transaction_id: {
            type: String,
        },
        confirm_payment_id: {
            type: String,
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

const Entry_Fee_Payment_Model = db.model(
    'Entry_Fee_Payment',
    Entry_Fee_Payment_Schema
)

module.exports = Entry_Fee_Payment_Model
