const db = require('../config/db').mongoose

const Hand_In = db.model('Hand_In', {
    public_id: String
})

module.exports = Hand_In