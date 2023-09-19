const db = require('../config/db')
const config = require('../config/schema')
const { Schema: Schema, Schema: { Types: { ObjectId }, }, } = require('mongoose')
const Competition_Model = require('./Competition')
const User_Model = require('./User')

const Competition__User_Schema = new Schema(
    {
        user_id: {
            type: ObjectId,
            ref: User_Model,
        },
        competition_id: {
            type: ObjectId,
            ref: Competition_Model,
        },
        roles: {
            type: [
                {
                    type: String,
                },
            ],
        },
        arrived: {
            type: Boolean,
        },
        table_leader: {
            type: Boolean
        },
    },
    config.model_schema_options
)

const Competition__User_Model = db.model(
    'Competition__User',
    Competition__User_Schema
)

module.exports = Competition__User_Model