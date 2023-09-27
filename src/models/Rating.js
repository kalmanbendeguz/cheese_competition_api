const config = require('../config/schema')
const db = require('../config/db')
const { Schema: Schema, Schema: { Types: { Mixed, ObjectId, Decimal128 } } } = require('mongoose')
const Competition_Model = require('./Competition')
const Product_Model = require('./Product')
const User_Model = require('./User')
const Competition__User_Model = require('./Competition__User')

const Rating_Schema = new Schema(
    {
        competition_id: {
            type: ObjectId,
            ref: Competition_Model,
        },
        product_id: {
            type: ObjectId,
            ref: Product_Model,
        },
        user_id: {
            type: ObjectId,
            ref: User_Model,
        },
        competition__user_id: {
            type: ObjectId,
            ref: Competition__User_Model,
        },
        anonymous: {
            type: Boolean,
        },
        aspects: {
            type: Mixed,
        },
        overall_impression: {
            type: String,
        },
        weight: {
            type: Decimal128
        }
    },
    config.model_schema_options
)

const Rating_Model = db.model(
    'Rating',
    Rating_Schema
)

module.exports = Rating_Model