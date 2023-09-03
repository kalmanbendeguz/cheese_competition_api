const Joi = require('joi')
const { mongoose: { Types: { ObjectId }, }, } = require('mongoose')

const competitor_of_competition_validator = Joi.object({
    competitor_id: Joi.object().instance(ObjectId).required(),
    competition_id: Joi.object().instance(ObjectId).required(),
}).unknown(true)

module.exports = competitor_of_competition_validator