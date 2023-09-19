const config = require('../config/schema')
const db = require('../config/db')
const { Schema: Schema, Schema: { Types: { ObjectId }, }, } = require('mongoose')
const User_Model = require('./User')

const Active_Password_Reset_Schema = new Schema(
    {
        user_id: {
            type: ObjectId,
            ref: User_Model,
        },
        restore_id: {
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

const Active_Password_Reset_Model = db.model(
    'Active_Password_Reset',
    Active_Password_Reset_Schema
)

module.exports = Active_Password_Reset_Model