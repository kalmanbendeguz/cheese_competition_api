const Joi = require('joi')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

module.exports = Joi.object({
    restore_id: Joi.string().trim().lowercase().length(32).alphanum().prefs({ convert: false }).required(),
    user_id: Joi.object().instance(ObjectId).required(),
    expiring_started: Joi.date().required()
}).unknown(true)