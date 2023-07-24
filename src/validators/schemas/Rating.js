const Joi = require('joi')
const { mongoose: { Types: { ObjectId }, }, } = require('mongoose')
const Rating_Aspect_Validator = require('./Rating_Aspect')

const rating_validator = Joi.object({
    product_id: Joi.object().instance(ObjectId).required(),
    judge_id: Joi.object().instance(ObjectId).required(),
    anonymous: Joi.boolean().required(),
    aspects: Joi.array().items(Rating_Aspect_Validator).min(1).required(),
    overall_impression: Joi.string().trim().min(25).max(250).prefs({ convert: false }).required(),
}).unknown(true)

module.exports = rating_validator