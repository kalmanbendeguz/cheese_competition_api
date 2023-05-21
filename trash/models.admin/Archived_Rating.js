const db = require('../config/db').mongoose

const Rating_Schema = require('./Rating').schema

const Archived_Rating = db.model('Archived_Rating', Rating_Schema)

module.exports = Archived_Rating