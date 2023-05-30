const {
    Schema: Schema,
    Schema: {
        Types: { ObjectId },
    },
} = require('mongoose')
const db = require('../config/db')
const Billing_Information_Schema = require('./schemas/Billing_Information')
const Competition_Model = require('./Competition')

const User_Schema = new Schema(
    {
        email: {
            type: String,
        },
        username: {
            type: String,
        },
        hashed_password: {
            type: String,
        },
        roles: {
            type: [
                {
                    type: String,
                },
            ],
        },
        full_name: {
            type: String,
        },
        contact_phone_number: {
            type: String,
        },
        billing_information: {
            type: Billing_Information_Schema,
        },
        association_member: {
            type: Boolean,
            default: false,
        },
        registration_temporary: {
            type: Boolean,
            default: true,
        },
        confirm_registration_id: {
            type: String,
        },
        table_leader: {
            type: [
                {
                    type: ObjectId,
                    ref: Competition_Model,
                },
            ],
        },
        arrived: {
            type: [
                {
                    type: ObjectId,
                    ref: Competition_Model,
                },
            ],
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

const User_Model = db.model('User', User_Schema)

module.exports = User_Model
