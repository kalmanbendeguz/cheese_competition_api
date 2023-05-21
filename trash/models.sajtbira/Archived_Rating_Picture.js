const db = require('../config/db').mongoose

const Rating_Picture_Schema = require('./Rating_Picture').schema

const Archived_Rating_Picture = db.model('Archived_Rating_Picture', Rating_Picture_Schema)

module.exports = Archived_Rating_Picture