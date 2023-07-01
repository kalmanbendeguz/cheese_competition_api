const { Schema: Schema, Schema: { Types: { ObjectId }, }, } = require('mongoose')
const db = require('../config/db')
const User_Model = require('./User')
const Competition_Model = require('./Competition')

const Product_Schema = new Schema(
    {
        competition_id: {
            type: ObjectId,
            ref: Competition_Model,
        },
        competitor_id: {
            type: ObjectId,
            ref: User_Model,
        },
        public_id: {
            type: String,
        },
        secret_id: {
            type: String,
        },
        product_name: {
            type: String,
        },
        anonimized_product_name: {
            type: String,
        },
        factory_name: {
            type: String,
        },
        maturation_time_type: {
            type: String,
        },
        maturation_time_quantity: {
            type: Number,
        },
        maturation_time_unit: {
            type: String,
        },
        milk_type: {
            type: String,
        },
        product_category_id: {
            type: String,
        },
        product_description: {
            type: String,
        },
        anonimized_product_description: {
            type: String,
        },
        approved: {
            type: Boolean,
            default: false,
        },
        approval_type: {
            type: String,
        },
        handed_in: {
            type: Boolean,
            default: false,
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

const Product_Model = db.model('Product', Product_Schema)

module.exports = Product_Model