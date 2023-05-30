const Joi = require("joi");

module.exports = Joi.object({
  title: Joi.string()
    .required()
    .trim()
    .lowercase()
    .min(1)
    .prefs({ convert: false }),
  score: Joi.number().integer().min(0).required(),
  blocks: Joi.array()
    .required()
    .min(1)
    .items(
      Joi.array()
        .items(Joi.string().trim().lowercase().min(1).required())
        .min(1)
        .unique()
        .required()
    ),
  comment: Joi.string()
    .required()
    .trim()
    .min(12)
    .max(250)
    .prefs({ convert: false }),
}).unknown(true);
