const Joi = require('joi')
const limited_roles = require('../../../static/limited_roles.json')

const allowed_role_validator = Joi.object({
    email: Joi.string().email().required(),
    allowed_roles: Joi.array()
        .items(Joi.string().valid(...limited_roles))
        .unique()
        .min(0)
        .required(),
}).unknown(true)

module.exports = allowed_role_validator