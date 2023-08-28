const Joi = require('joi')

const request_validator = Joi.object().required()

module.exports = request_validator