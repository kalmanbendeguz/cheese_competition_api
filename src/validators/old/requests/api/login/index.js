const Joi = require('joi')

const login_validator = Joi.object({
    body: Joi.object({
        email: Joi.string()
            .email(),
        username: Joi.string()
            .trim()
            .alphanum()
            .min(5)
            .max(40)
            .prefs({ convert: false }),
        plain_password: Joi.string()
            .min(1)
            .required()
    }).xor('email', 'username').required(),
}).unknown(true).required()

module.exports = login_validator