const config = require('../config/schema')
const db = require('../config/db')
const { Schema: Schema, Schema: { Types: { Mixed, ObjectId }, }, } = require('mongoose')
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
        barion_state: {
            type: Mixed,
        },
        pos_transaction_id: {
            type: String,
        },
        billing_information: {
            type: Mixed,
        },
        confirmation: {
            type: Mixed,
        },
        value: {
            type: Mixed,
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