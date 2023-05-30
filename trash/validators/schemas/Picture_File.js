const Joi = require("joi");
const sanitize_file_name = require("sanitize-filename");

module.exports = Joi.object({
  file_name: Joi.string()
    .custom((value, helpers) => {
      const sanitized_file_name = sanitize_file_name(value);
      if (sanitized_file_name !== value) {
        return helpers.error("string.invalid_file_name", {
          sanitized_file_name,
        });
      }
      return sanitized_file_name;
    }, "validate_file_name")
    .messages({
      "string.invalid_file_name":
        '{{#label}}: "{{#value}}" is an invalid file name.',
    })
    .required(),
  encoding: Joi.string().trim().min(1).required().prefs({ convert: false }),
  mimetype: Joi.string().trim().min(1).required().prefs({ convert: false }),
  buffer: Joi.binary()
    .encoding(Joi.ref("encoding"))
    .length(Joi.ref("size"))
    .required(),
  size: Joi.number().integer().min(0).max(5242880).required(),
}).unknown(true);
