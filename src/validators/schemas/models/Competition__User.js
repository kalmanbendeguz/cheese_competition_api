const Joi = require('joi')
const { mongoose: { Types: { ObjectId }, }, } = require('mongoose')
const user_roles = require('../../../static/user_roles.json')

const competition__user_validator = Joi.object({
    user_id: Joi.object().instance(ObjectId).required(),
    competition_id: Joi.object().instance(ObjectId).required(),

    roles: Joi.array()
        .items(
            Joi.string().valid(...user_roles)
        )
        .unique()
        .min(0)
        .required(),

    arrived: Joi.boolean().when('roles', {
        is: Joi.array().items(Joi.string().invalid('judge')),
        then: Joi.optional(),
        otherwise: Joi.required(),
    }),

    table_leader: Joi.boolean().when('roles', {
        is: Joi.array().items(Joi.string().invalid('judge')),
        then: Joi.optional(),
        otherwise: Joi.required(),
    }),
}).unknown(true)

module.exports = competition__user_validator