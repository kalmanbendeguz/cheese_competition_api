const Joi = require('joi')
const { mongoose: { Types: { ObjectId }, }, } = require('mongoose')

const organizer_of_competition_validator = Joi.object({
    organizer_id: Joi.object().instance(ObjectId).required(),
    competition_id: Joi.object().instance(ObjectId).required(),
}).unknown(true)

module.exports = organizer_of_competition_validator