const db = require('../config/db')
const config = require('../config/schema')
const { Schema: Schema, Schema: { Types: { ObjectId }, }, } = require('mongoose')
const Competition_Model = require('./Competition')
const User_Model = require('./User')

const Judge_Of_Competition_Schema = new Schema(
    {
        // Cannot be changed
        judge_id: {
            type: ObjectId,
            ref: User_Model,
        },
        competition_id: {
            type: ObjectId,
            ref: Competition_Model,
        },

        // Can be changed independently
        arrived: {
            type: Boolean,
        },
        table_leader: {
            type: Boolean
        },
    },
    config.model_schema_options
)

const Judge_Of_Competition_Model = db.model(
    '_Judge_Of_Competition',
    Judge_Of_Competition_Schema
)

module.exports = Judge_Of_Competition_Model