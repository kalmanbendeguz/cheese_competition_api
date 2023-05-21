const Joi = require('joi')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')
const Picture_File_Validator = require('./Picture_File')

module.exports = Joi.object({
    rating_id: Joi.object().instance(ObjectId).required(),
    picture: Picture_File_Validator.required()
}).unknown(true)