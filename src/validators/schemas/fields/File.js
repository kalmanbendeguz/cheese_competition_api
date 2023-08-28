const Joi = require('joi')
const sanitize_file_name = require('sanitize-filename')

const file_validator = Joi.object({
    name: Joi.string()
        .max(200)
        .custom((value, helpers) => {
            const sanitized_file_name = sanitize_file_name(value)
            if (sanitized_file_name !== value) {
                throw new Error('invalid_file_name')
            }
            return value
        })
        .required(),
    mimetype: Joi.string() // there are a lot of mime types and they are constantly changing. // the best validation is to check if there is a "/" in it and at least one char before and after.
        .pattern(
            new RegExp(
                `^[^\s/]+\/[^\s/]+$`
            )
        )
        .required(),
    buffer: Joi.binary().length(Joi.ref('size')).required(),
    size: Joi.number()
        .integer()
        .min(0)
        .max(5242880) // 5 MiB !!! = 5 * 1024^2 bytes
        .required(),
}).unknown(true)

module.exports = file_validator