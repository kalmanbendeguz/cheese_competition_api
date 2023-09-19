const config = require('../config/schema')
const db = require('../config/db')
const { Schema: Schema, Schema: { Types: { Mixed } } } = require('mongoose')
const Allowed_Role_Model = require('./Allowed_Role')

const User_Schema = new Schema(
    {
        allowed_role_id: {
            type: ObjectId,
            ref: Allowed_Role_Model,
        },
        email: {
            type: String,
        },
        username: {
            type: String,
        },
        hashed_password: {
            type: String,
        },
        full_name: {
            type: String,
        },
        registration: {
            type: Mixed,
        },
        roles: {
            type: [
                {
                    type: String,
                },
            ],
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