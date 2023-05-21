const db = require('../config/db').mongoose

const Allowed_Judge = db.model('Allowed_Judge', {
    email: String
})

module.exports = Allowed_Judge