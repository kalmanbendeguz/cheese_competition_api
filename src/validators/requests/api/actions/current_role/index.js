const Joi = require('joi')

const validator = Joi.object().unknown(true).required()

module.exports = validator