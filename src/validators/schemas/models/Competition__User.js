const Joi = require('joi')
const { mongoose: { Types: { ObjectId }, }, } = require('mongoose')
const valid_roles = require('../../../static/valid_roles.json')

const user_of_competition_validator = Joi.object({
    user_id: Joi.object().instance(ObjectId).required(),
    competition_id: Joi.object().instance(ObjectId).required(),

    roles: Joi.array()
        .items(
            Joi.string().valid(...valid_roles)
        )
        .unique()
        .min(0)
        .required(),

    arrived: Joi.boolean().when('roles', {
        is: Joi.array().items(Joi.string().invalid('judge')),
        then: Joi.forbidden(),
        otherwise: Joi.required(),
    }),

    table_leader: Joi.boolean().when('roles', {
        is: Joi.array().items(Joi.string().invalid('judge')),
        then: Joi.forbidden(),
        otherwise: Joi.required(),
    }),
}).unknown(true)

module.exports = user_of_competition_validator