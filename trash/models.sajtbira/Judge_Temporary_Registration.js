const db = require('../config/db').mongoose
const Judge_User_Model = require('./Judge_User').schema

const Judge_Temporary_Registration = db.model('Judge_Temporary_Registration', {
    user: Judge_User_Model,
    confirm_id: String
})

module.exports = Judge_Temporary_Registration