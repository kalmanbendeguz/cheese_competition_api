const Joi = require('joi')

const data_validator = Joi.object({
    query: Joi.object({
        _id: Joi.any().optional(),
        user_id: Joi.any().optional(),
        restore_id: Joi.any().optional(),
        expiring_started: Joi.any().optional(),
    }).required(),
    body: Joi.object({
        restore_id: Joi.string().lowercase().length(32).alphanum().prefs({ convert: false }).optional(),
        user_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(), // only for SERVER  user
        // expiring_started cannot be modified
    }).required()
}).required()

module.exports = data_validator