const Joi = require('joi')

const query_validator = Joi.object({
    _id: Joi.any().optional(),
    user_id: Joi.any().optional(),
    restore_id: Joi.any().optional(),
    expiring_started: Joi.any().optional(),
}).required()

module.exports = query_validator