const Joi = require('joi')

const logout_validator = Joi.object().unknown(true).required()

module.exports = logout_validator