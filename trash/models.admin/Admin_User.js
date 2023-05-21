const db = require('../config/db').mongoose
const { Schema } = require('mongoose')

const Admin_User_Schema = new Schema({ 
    email: String,
    hashed_password: String
}, { timestamps: true })

const Admin_User = db.model('Admin_User', Admin_User_Schema)

module.exports = Admin_User