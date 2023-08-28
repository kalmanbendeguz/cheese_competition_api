const config = require('../config/schema')
const db = require('../config/db')
const { Schema: Schema, Schema: { Types: { ObjectId, Decimal128 }, }, } = require('mongoose')
const Product_Model = require('./Product')

const Entry_Fee_Payment_Schema = new Schema(
    {
        // Cannot be changed
        product_ids: {
            type: [
                {
                    type: ObjectId,
                    ref: Product_Model,
                },
            ],
        },
        pos_transaction_id: {
            type: String,
        },
        confirm_payment_id: {
            type: String,
        },
        
        // Can be changed independently, but something depends on it
        pending: {
            type: Boolean,
        },

        // Can be changed but depends on something
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