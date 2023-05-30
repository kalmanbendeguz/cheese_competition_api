const Joi = require('joi')

const query_validator = Joi.object({
    _id: Joi.any().optional(),
    email: Joi.any().optional(),
    allowed_roles: Joi.any().optional(),
}).required()

module.exports = query_validator
