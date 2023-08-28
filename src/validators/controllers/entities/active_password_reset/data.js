const Joi = require('joi')

const data_validator = Joi.object({
    user_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
    restore_id: Joi.string()
        .trim()
        .lowercase()
        .length(32)
        .alphanum()
        .prefs({ convert: false })
        .optional(),
    // expiring_started // Internal
})

module.exports = data_validator