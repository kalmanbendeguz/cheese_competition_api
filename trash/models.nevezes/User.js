const db = require('../config/db').mongoose
const { Schema } = require('mongoose')

const User_Schema = new Schema({ 
    email: String,
    hashed_password: String,
    salt: String,
    full_name: String,
    contact_phone_number: String,
    billing_name: String,
    billing_tax_number: String,
    billing_zip: String,
    billing_city: String,
    billing_street: String,
    billing_street_type: String,
    billing_house_number: String,
    billing_address_details: String,
    association_member: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const User = db.model('User', User_Schema)

module.exports = User