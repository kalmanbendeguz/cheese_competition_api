const db = require('../config/db').mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Key_Value = db.model('Key_Value', {
    key: String,
    value: Schema.Types.Mixed
})

module.exports = Key_Value