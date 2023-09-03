const Joi = require('joi')
const { mongoose: { Types: { ObjectId }, }, } = require('mongoose')

const judge_of_competition_validator = Joi.object({
    judge_id: Joi.object().instance(ObjectId).required(),
    competition_id: Joi.object().instance(ObjectId).required(),

    arrived: Joi.boolean().required(),
    table_leader: Joi.boolean().required(),
}).unknown(true)

module.exports = judge_of_competition_validator