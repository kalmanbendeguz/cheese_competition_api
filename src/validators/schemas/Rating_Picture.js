const Joi = require('joi')
const { mongoose: { Types: { ObjectId }, }, } = require('mongoose')
const File_Validator = require('./File')

const rating_picture_validator = Joi.object({
    rating_id: Joi.object().instance(ObjectId).required(),
    picture: File_Validator.required(),
}).unknown(true)

module.exports = rating_picture_validator