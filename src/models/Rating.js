const { Schema: Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const db = require('../config/db')
const Product_Model = require('./Product')
const User_Model = require('./User')
const Rating_Aspect_Schema = require('./schemas/Rating_Aspect')

const Rating_Schema = new Schema({
    product_id: {
        type: ObjectId,
        ref: Product_Model,
    },
    judge_id: {
        type: ObjectId,
        ref: User_Model,
    },
    anonymous: {
        type: Boolean,
        default: false,
    },
    aspects: {
        type: [{
            type: Rating_Aspect_Schema,
        }],
    },
    overall_impression: {
        type: String,
    },
}, {
    timestamps: true,
    minimize: false,
    strict: true,
    strictQuery: false,
    validateBeforeSave: true
})

const Rating_Model = db.model(
    'Rating',
    Rating_Schema,
)

module.exports = Rating_Model