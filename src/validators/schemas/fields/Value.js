const Joi = require('joi')
const valid_currencies = require('../../../static/valid_currencies.json')
const { mongoose: { Types: { Decimal128 }, }, } = require('mongoose')

const value_validator = (convert) => Joi.object({

    amount: convert ? Joi.alternatives().try(
        Joi.number().min(0),
        Joi.object().instance(Decimal128),
    ).required() : Joi.object().instance(Decimal128).required(),

    currency: Joi.string().valid(...valid_currencies).prefs({convert: convert}).required(),
    
}).unknown(true)

module.exports = value_validator