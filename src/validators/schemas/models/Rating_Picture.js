const Joi = require('joi')
const { mongoose: { Types: { ObjectId }, }, } = require('mongoose')
const File_Validator = require('../fields/File')

const rating_picture_validator = Joi.object({
    competition_id: Joi.object().instance(ObjectId).optional(),
    user_id: Joi.object().instance(ObjectId).optional(),
    product_id: Joi.object().instance(ObjectId).optional(),
    rating_id: Joi.object().instance(ObjectId).optional(),
    competition__user_id: Joi.object().instance(ObjectId).required(),
    
    picture: File_Validator(false).required(),
}).unknown(true)

module.exports = rating_picture_validator