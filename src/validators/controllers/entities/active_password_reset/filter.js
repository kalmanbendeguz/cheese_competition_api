const Joi = require('joi')

const filter_validator = Joi.object({
    _id: Joi.any().optional(),
    user_id: Joi.any().optional(),
    restore_id: Joi.any().optional(),
    expiring_started: Joi.any().optional(),
})

module.exports = filter_validator