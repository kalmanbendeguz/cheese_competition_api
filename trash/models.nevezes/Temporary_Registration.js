const db = require('../config/db').mongoose
const User_Model = require('./User').schema

const Temporary_Registration = db.model('Temporary_Registration', {
    user: User_Model,
    confirm_id: String
})

module.exports = Temporary_Registration