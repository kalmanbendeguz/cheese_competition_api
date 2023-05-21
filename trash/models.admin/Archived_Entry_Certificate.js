const db = require('../config/db').mongoose

const Entry_Certificate_Schema = require('./Entry_Certificate').schema

const Archived_Entry_Certificate = db.model('Archived_Entry_Certificate', Entry_Certificate_Schema)

module.exports = Archived_Entry_Certificate