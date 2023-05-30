const {
    Schema: Schema,
    Schema: {
        Types: { ObjectId },
    },
} = require('mongoose')
const db = require('../config/db')
const User_Model = require('./User')

const Active_Password_Reset_Schema = new Schema(
    {
        restore_id: {
            type: String,
        },
        user_id: {
            type: ObjectId,
            ref: User_Model,
        },
        expiring_started: {
            type: Date,
            default: Date.now,
            expires: 15 * 60,
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

const Active_Password_Reset_Model = db.model(
    'Active_Password_Reset',
    Active_Password_Reset_Schema
)

module.exports = Active_Password_Reset_Model
