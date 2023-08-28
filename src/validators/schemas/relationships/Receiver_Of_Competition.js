const Joi = require('joi')
const { mongoose: { Types: { ObjectId }, }, } = require('mongoose')

const receiver_of_competition_validator = Joi.object({
    receiver_id: Joi.object().instance(ObjectId).required(),
    competition_id: Joi.object().instance(ObjectId).required(),
}).unknown(true)

module.exports = receiver_of_competition_validator