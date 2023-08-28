const db = require('../../config/db')
const config = require('../../config/schema')
const { Schema: Schema, Schema: { Types: { ObjectId }, }, } = require('mongoose')
const Competition_Model = require('../Competition')
const User_Model = require('../User')

const Receiver_Of_Competition_Schema = new Schema(
    {
        // Cannot be changed
        receiver_id: {
            type: ObjectId,
            ref: User_Model,
        },
        competition_id: {
            type: ObjectId,
            ref: Competition_Model,
        },
    },
    config.model_schema_options
)

const Receiver_Of_Competition_Model = db.model(
    '_Receiver_Of_Competition',
    Receiver_Of_Competition_Schema
)

module.exports = Receiver_Of_Competition_Model