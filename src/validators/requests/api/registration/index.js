const Joi = require('joi')

const registration_validator = Joi.object({
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
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
            // TODO: this might be a wrong code here.
            .message('{#label}_must_have_at_least_one_lowercase_letter_one_uppercase_letter_and_one_number')
            .required()
    }).required(),
}).unknown(true).required()

module.exports = registration_validator
