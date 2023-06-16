const Joi = require('joi')

const query_validator = Joi.object().optional()

module.exports = query_validator
