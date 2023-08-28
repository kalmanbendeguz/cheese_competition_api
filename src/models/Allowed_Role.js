const config = require('../config/schema')
const db = require('../config/db')
const { Schema } = require('mongoose')

const Allowed_Role_Schema = new Schema(
    {
        // Cannot be changed
        email: {
            type: String,
        },

        // Can be changed independently
        allowed_roles: {
            type: [
                {
                    type: String,
                },
            ],
        },
    },
    config.model_schema_options
)

const Allowed_Role_Model = db.model(
    'Allowed_Role',
    Allowed_Role_Schema
)

module.exports = Allowed_Role_Model