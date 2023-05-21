const db = require('../config/db').mongoose
const Admin_User_Model = require('./Admin_User').schema

const Admin_Temporary_Registration = db.model('Admin_Temporary_Registration', {
    user: Admin_User_Model,
    confirm_string: String
})

module.exports = Admin_Temporary_Registration