const config = require('../config/schema')
const db = require('../config/db')
const { Schema: Schema, Schema: { Types: { Mixed, ObjectId } } } = require('mongoose')

const Competition_Model = require('./Competition')
const Product_Model = require('./Product')
const Rating_Model = require('./Rating')
const User_Model = require('./User')

const Rating_Picture_Schema = new Schema(
    {
        // Cannot be changed
        competition_id: {
            type: ObjectId,
            ref: Competition_Model,
        },
        judge_id: {
            type: ObjectId,
            ref: Competition_Model,
        },
        product_id: {
            type: ObjectId,
            ref: Product_Model,
        },
        rating_id: {
            type: ObjectId,
            ref: Rating_Model,
        },

        // Can be changed independently
        picture: {
            type: Mixed,
        },
    },
    config.model_schema_options
)

const Rating_Picture_Model = db.model(
    'Rating_Picture',
    Rating_Picture_Schema
)

module.exports = Rating_Picture_Model