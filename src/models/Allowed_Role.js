const { Schema } = require('mongoose')
const db = require('../config/db')

const Allowed_Role_Schema = new Schema(
    {
        email: {
            type: String,
        },
        allowed_roles: {
            type: [
                {
                    type: String,
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

const Allowed_Role_Model = db.model('Allowed_Role', Allowed_Role_Schema)

module.exports = Allowed_Role_Model