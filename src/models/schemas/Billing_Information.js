const { Schema } = require('mongoose')

const Billing_Information_Schema = new Schema(
    {
        name: {
            type: String,
        },
        tax_number: {
            type: String,
        },
        zip: {
            type: String,
        },
        city: {
            type: String,
        },
        street: {
            type: String,
        },
        street_type: {
            type: String,
        },
        house_number: {
            type: String,
        },
        address_details: {
            type: String,
        },
    },
    {
        minimize: false,
        strict: true,
        strictQuery: false,
        validateBeforeSave: true,
    }
)

module.exports = Billing_Information_Schema
