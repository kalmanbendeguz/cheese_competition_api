const Joi = require('joi')
const { mongoose: { Types: { ObjectId }, }, } = require('mongoose')

const active_password_reset_validator = Joi.object({
    user_id: Joi.object().instance(ObjectId).required(),
    restore_id: Joi.string()
        .trim()
        .lowercase()
        .length(32)
        .alphanum()
        .prefs({ convert: false })
        .required(),
    expiring_started: Joi.date().required(),
}).unknown(true)

module.exports = active_password_reset_validator