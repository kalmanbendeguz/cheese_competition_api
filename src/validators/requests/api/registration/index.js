const Joi = require('joi')

const registration_validator = Joi.object().optional()

module.exports = registration_validator
