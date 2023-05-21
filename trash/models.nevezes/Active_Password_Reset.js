const db = require('../config/db').mongoose

const Active_Password_Reset = db.model('Active_Password_Reset', {
    restore_id: String,
    email: String,
    expiring_started: {
        type: Date,
        default: Date.now,
        expires: 15*60
    }
})

module.exports = Active_Password_Reset