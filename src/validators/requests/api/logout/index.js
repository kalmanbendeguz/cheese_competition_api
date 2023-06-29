const Joi = require('joi')

const logout_validator = Joi.object().optional()

module.exports = logout_validator
