const Joi = require('joi')
const { mongoose: { Types: { ObjectId }, }, } = require('mongoose')
const Rating_Aspect_Validator = require('../fields/Rating_Aspect')

const rating_validator = Joi.object({
    competition_id: Joi.object().instance(ObjectId).required(),
    product_id: Joi.object().instance(ObjectId).required(),
    judge_id: Joi.object().instance(ObjectId).required(),

    anonymous: Joi.boolean().required(),
    aspects: Joi.array().items(Rating_Aspect_Validator).min(1).required(),
    overall_impression: Joi.string().trim().min(25).max(500).prefs({ convert: false }).required(),
}).unknown(true)

module.exports = rating_validator