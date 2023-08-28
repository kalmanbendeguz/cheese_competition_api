const config = require('../../../config/schema')
const { Schema } = require('mongoose')

const File_Schema = new Schema(
    {
        name: {
            type: String,
        },
        mimetype: {
            type: String,
        },
        buffer: {
            type: Buffer,
        },
        size: {
            type: Number,
        },
    },
    config.schema_options
)

module.exports = File_Schema