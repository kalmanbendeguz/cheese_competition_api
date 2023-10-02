const Joi = require('joi')

const content_validator = Joi.object({
    user_id: Joi.string().trim().min(1).optional(),
    // restore_id // Internal
    expiring_started: Joi.date().optional(),
})

module.exports = content_validator