const Joi = require('joi')

const login_validator = Joi.object().optional()

module.exports = login_validator
