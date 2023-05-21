const db = require('../config/db').mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cheese_Schema = new Schema({ 
    manufacturer: Schema.Types.ObjectId,
    public_id: String,
    secret_id: String,
    product_name: String,
    factory_name: String,
    maturation_time_type: String,
    maturation_time_quantity: Number,
    maturation_time_unit: String,
    milk_type: String,
    product_category_list: [String],
    product_description: String
}, { timestamps: true })

const Cheese = db.model('Cheese', Cheese_Schema)

module.exports = Cheese
module.exports.schema = Cheese_Schema