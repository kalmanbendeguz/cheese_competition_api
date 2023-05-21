const { Schema } = require('mongoose')
const db = require('../../src/config/db')

const Allowed_Role_Schema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    allowed_roles: {
        type: [{
            type: String,
        }],
        index: true,
    },
}, {
    timestamps: true,
    minimize: false,
    strict: true,
    strictQuery: false,
    validateBeforeSave: true
})

module.exports = db.model(
    'Allowed_Role',
    Allowed_Role_Schema
)