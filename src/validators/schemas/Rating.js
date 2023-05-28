const Joi = require('joi')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')
const Rating_Aspect_Validator = require('./Rating_Aspect')

module.exports = Joi.object({
    product_id: Joi.object().instance(ObjectId).required(),
    judge_id: Joi.object().instance(ObjectId).required(),
    anonymous: Joi.boolean().required(),
    aspects: Joi.array().items(
        Rating_Aspect_Validator
    ).required().min(1),
    overall_impression: Joi.string().trim().required().min(25).max(250),
}).unknown(true)