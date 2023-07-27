const Joi = require('joi')
const File_Validator = require('../../../schemas/File')

const data_validator = Joi.object({
    query: Joi.object({
        _id: Joi.any().optional(),
        rating_id: Joi.any().optional(),
        picture: Joi.any().optional(),
    }).required(),
    body: Joi.object({
        // rating_id // Forbidden to update.
        picture: File_Validator.optional(),
    }).required(),
}).required()

module.exports = data_validator