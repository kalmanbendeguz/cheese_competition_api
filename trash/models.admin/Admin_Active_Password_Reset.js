const db = require('../config/db').mongoose

const Admin_Active_Password_Reset = db.model('Admin_Active_Password_Reset', {
    restore_id: String,
    email: String,
    expiring_started: {
        type: Date,
        default: Date.now,
        expires: 15*60
    }
})

module.exports = Admin_Active_Password_Reset