const config = require('../config/schema')
const db = require('../config/db')
const { Schema: Schema, Schema: { Types: { Mixed, ObjectId } } } = require('mongoose')
const Competition_Model = require('./Competition')
const Product_Model = require('./Product')
const Rating_Model = require('./Rating')
const User_Model = require('./User')
const Competition__User_Model = require('./Competition__User')

const Rating_Picture_Schema = new Schema(
    {
        competition_id: {
            type: ObjectId,
            ref: Competition_Model,
        },
        user_id: {
            type: ObjectId,
            ref: User_Model,
        },
        product_id: {
            type: ObjectId,
            ref: Product_Model,
        },
        rating_id: {
            type: ObjectId,
            ref: Rating_Model,
        },
        competition__user_id: {
            type: ObjectId,
            ref: Competition__User_Model,
        },
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