const db = require('../config/db').mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Hand_In_Schema = new Schema({ 
    public_id: String
})

const Hand_In = db.model('Hand_In', Hand_In_Schema)

module.exports = Hand_In
module.exports.schema = Hand_In_Schema