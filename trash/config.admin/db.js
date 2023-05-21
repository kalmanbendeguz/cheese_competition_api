const mongoose = require('mongoose')

const db_url = process.env.DATABASE_URL || 'mongodb://localhost/sajt'

const connection = mongoose.connect(db_url)

module.exports.mongoose = mongoose
module.exports.connection = connection