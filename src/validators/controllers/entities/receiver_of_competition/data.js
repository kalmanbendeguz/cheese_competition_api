const Joi = require('joi')

const data_validator = Joi.object({
    receiver_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
    competition_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
})

module.exports = data_validator