const Joi = require('joi')

const validator = Joi.object({
    body: Joi.object({
        email: Joi.string()
            .email(),
        username: Joi.string()
            .trim()
            .alphanum()
            .min(5)
            .max(40)
            .prefs({ convert: false }),
    }).xor('email', 'username').required(),
}).unknown(true).required()

module.exports = validator