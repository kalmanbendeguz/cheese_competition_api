const Joi = require('joi')

const validator = Joi.object({
    body: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        username: Joi.string()
            .trim()
            .alphanum()
            .min(5)
            .max(40)
            .prefs({ convert: false })
            .required(),
        plain_password: Joi.string()
            .min(8)
            .max(25)
            .pattern(
                new RegExp(
                    `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$`
                )
            )
            .required()
    }).required(),
}).unknown(true).required()

module.exports = validator
