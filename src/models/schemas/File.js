const { Schema } = require('mongoose')

const File_Schema = new Schema({
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
    }
}, {
    minimize: false,
    strict: true,
    strictQuery: false,
    validateBeforeSave: true
})

module.exports = File_Schema