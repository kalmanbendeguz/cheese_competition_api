const { Schema } = require('mongoose')
const db = require('../../src/config/db')

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

module.exports = db.model('Allowed_Role', Allowed_Role_Schema)
