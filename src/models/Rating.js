const config = require('../config/schema')
const db = require('../config/db')
const { Schema: Schema, Schema: { Types: { Mixed, ObjectId } } } = require('mongoose')
const Competition_Model = require('./Competition')
const Product_Model = require('./Product')
const User_Model = require('./User')

const Rating_Schema = new Schema(
    {
        // Cannot be changed
        competition_id: {
            type: ObjectId,
            ref: Competition_Model,
        },
        product_id: {
            type: ObjectId,
            ref: Product_Model,
        },
        judge_id: {
            type: ObjectId,
            ref: User_Model,
        },

        // Can be changed independently
        anonymous: {
            type: Boolean,
        },
        aspects: {
            type: [
                {
                    type: Mixed,
                },
            ],
        },
        overall_impression: {
            type: String,
        },
    },
    config.model_schema_options
)

const Rating_Model = db.model(
    'Rating',
    Rating_Schema
)

module.exports = Rating_Model