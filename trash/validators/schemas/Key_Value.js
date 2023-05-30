const Joi = require("joi");

module.exports = Joi.object({
  key: Joi.string().lowercase().required().min(1).prefs({ convert: false }),
  value: Joi.required(),
}).unknown(true);
