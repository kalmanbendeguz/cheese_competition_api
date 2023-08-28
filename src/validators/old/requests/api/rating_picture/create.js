const Joi = require('joi')
const File_Validator = require('../../../schemas/File')

const object_schema = Joi.object({
    rating_id: Joi.string().trim().min(1).prefs({ convert: false }).required(),
    picture: File_Validator.required()
}).required()

const array_schema = Joi.array().items(object_schema).min(1).required()

const alternatives_schema = Joi.alternatives().try(object_schema, array_schema)

module.exports = alternatives_schema