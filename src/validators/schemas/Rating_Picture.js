const Joi = require('joi')

const rating_picture_validator = Joi.object().optional().unknown(true)

module.exports = rating_picture_validator