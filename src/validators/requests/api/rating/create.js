// judge, server
const Joi = require('joi')
const Rating_Aspect_Validator = require('../../../schemas/Rating_Aspect')

const object_schema = Joi.object({
    product_id: Joi.string().trim().min(1).prefs({ convert: false }).required(),
    user_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(), // required for server, (omitted for judge)
    anonymous: Joi.boolean().optional(), // default: false
    aspects: Joi.array().items( // check the format later, in 'check_dependencies'
        Rating_Aspect_Validator
    ).required().min(1),
    overall_impression: Joi.string().trim().min(25).max(250).required(), // ok
}).required()

const array_schema = Joi.array().items(object_schema).min(1).required()

module.exports = Joi.alternatives().try(
    object_schema,
    array_schema
)

