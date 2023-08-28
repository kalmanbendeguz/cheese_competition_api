const Joi = require('joi')

const filter_validator = Joi.object({
    _id: Joi.any().optional(),
    email: Joi.any().optional(),
    allowed_roles: Joi.any().optional(),
})

module.exports = filter_validator