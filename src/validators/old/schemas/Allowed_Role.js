const Joi = require('joi')
const valid_roles = require('../../static/valid_roles.json')

const allowed_role_validator = Joi.object({
    email: Joi.string().email().required(),
    allowed_roles: Joi.array()
        .items(Joi.string().valid(...valid_roles))
        .unique()
        .min(1)
        .required(),
}).unknown(true)

module.exports = allowed_role_validator