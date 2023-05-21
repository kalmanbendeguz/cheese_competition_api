const db = require('../config/db').mongoose
const Rating_Model = require('./Rating').schema

const Temporary_Rating = db.model('Temporary_Rating', {
    rating: Rating_Model,
    confirm_id: String,
    expiring_started: {
        type: Date,
        default: Date.now,
        expires: 36*60*60
    }
})

module.exports = Temporary_Rating