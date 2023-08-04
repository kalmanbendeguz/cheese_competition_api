const Joi = require('joi')

const data_validator = Joi.object({
    query: Joi.object({
        _id: Joi.any().optional(),
        user_id: Joi.any().optional(),
        restore_id: Joi.any().optional(),
        expiring_started: Joi.any().optional(),
    }).required(),
    body: Joi.object({
        // user_id // Forbidden to update
        // restore_id // Forbidden to update
        // expiring_started // Forbidden to update
    }).required(),
}).required()

module.exports = data_validator