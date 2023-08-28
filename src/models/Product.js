const config = require('../config/schema')
const db = require('../config/db')
const { Schema: Schema, Schema: { Types: { ObjectId }, }, } = require('mongoose')
const User_Model = require('./User')
const Competition_Model = require('./Competition')

const Product_Schema = new Schema(
    {
        // Cannot be changed
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

        // Can be changed independently
        product_category_id: {
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
        product_description: {
            type: String,
        },
        anonimized_product_description: {
            type: String,
        },

        // Can be changed independently, but something depends on it
        maturation_time_type: {
            type: String,
        },
        approved: {
            type: Boolean,
        },

        // Can be changed but depends on something
        maturation_time_quantity: {
            type: Number,
        },
        maturation_time_unit: {
            type: String,
        },
        approval_type: {
            type: String,
        },
        handed_in: {
            type: Boolean,
        },
    },
    config.model_schema_options
)

const Product_Model = db.model(
    'Product',
    Product_Schema
)

module.exports = Product_Model