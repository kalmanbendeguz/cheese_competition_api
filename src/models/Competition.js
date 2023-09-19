const config = require('../config/schema')
const db = require('../config/db')
const { Schema: Schema, Schema: { Types: { Mixed }, }, } = require('mongoose')

const Competition_Schema = new Schema(
    {
        name: {
            type: String,
        },
        place: {
            type: String,
        },
        ignore_extreme_values: {
            type: Boolean,
        },
        certificate_template: {
            type: Mixed,
        },
        category_configuration: {
            type: Mixed,
        },
        approval_configuration: {
            type: Mixed,
        },
        state: {
            type: Mixed,
        },
    },
    config.model_schema_options
)

const Competition_Model = db.model(
    'Competition',
    Competition_Schema
)

module.exports = Competition_Model