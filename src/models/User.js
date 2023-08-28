const config = require('../config/schema')
const db = require('../config/db')
const { Schema: Schema, Schema: { Types: { Mixed } } } = require('mongoose')

const User_Schema = new Schema(
    {
        // Cannot be changed
        email: {
            type: String,
        },

        // Can be changed independently
        username: {
            type: String,
        },
        hashed_password: {
            type: String,
        },
        full_name: {
            type: String,
        },

        // Can be changed independently, but something depends on it
        registration_temporary: {
            type: Boolean,
        },
        roles: {
            type: [
                {
                    type: String,
                },
            ],
        },

        // Can be changed but depends on something
        confirm_registration_id: {
            type: String,
        },
        contact_phone_number: {
            type: String,
        },
        billing_information: {
            type: Mixed,
        },
        association_member: {
            type: Boolean,
        },
    },
    config.model_schema_options
)

const User_Model = db.model(
    'User',
    User_Schema
)

module.exports = User_Model