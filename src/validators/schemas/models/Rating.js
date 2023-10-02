const Joi = require('joi')
const { mongoose: { Types: { ObjectId, Decimal128 }, }, } = require('mongoose')
const Aspect_Validator = require('../fields/Rating/Aspect')

const rating_validator = Joi.object({
    competition_id: Joi.object().instance(ObjectId).required(),
    product_id: Joi.object().instance(ObjectId).optional(),
    user_id: Joi.object().instance(ObjectId).optional(),
    competition__user_id: Joi.object().instance(ObjectId).required(),

    anonymous: Joi.boolean().required(),
    aspects: Joi.array().items(Aspect_Validator(false)).min(1).required(),
    overall_impression: Joi.string().trim().min(20).max(1000).prefs({ convert: false }).required(),
    weight: Joi.object().instance(Decimal128).required(),
}).unknown(true)

module.exports = rating_validator