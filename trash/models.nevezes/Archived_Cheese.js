const db = require('../config/db').mongoose

const Cheese_Schema = require('./Cheese').schema

const Archived_Cheese = db.model('Archived_Cheese', Cheese_Schema)

module.exports = Archived_Cheese