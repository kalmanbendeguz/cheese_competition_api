const db = require('../config/db').mongoose
const { Schema } = require('mongoose')

const Judge_User_Schema = new Schema({ 
    email: String,
    hashed_password: String,
    full_name: String,
    table_leader: Boolean
}, { timestamps: true })

const Judge_User = db.model('Judge_User', Judge_User_Schema)

module.exports = Judge_User