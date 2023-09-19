const config = require('../config/schema')
const db = require('../config/db')
const { Schema: Schema, Schema: { Types: { Mixed, ObjectId }, }, } = require('mongoose')
const User_Model = require('./User')
const Competition_Model = require('./Competition')
const Entry_Fee_Payment_Model = require('./Entry_Fee_Payment')

const Product_Schema = new Schema(
    {
        competition_id: {
            type: ObjectId,
            ref: Competition_Model,
        },
        user_id: {
            type: ObjectId,
            ref: User_Model,
        },
        entry_fee_payment_id: {
            type: ObjectId,
            ref: Entry_Fee_Payment_Model,
        },
        public_id: {
            type: String,
        },
        secret_id: {
            type: String,
        },
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
        maturation_time: {
            type: Mixed,
        },
        state: {
            type: Mixed,
        },
    },
    config.model_schema_options
)

const Product_Model = db.model(
    'Product',
    Product_Schema
)

module.exports = Product_Model