const Joi = require('joi')

const object_schema = Joi.object({
    email: Joi.string().email().required(),
    allowed_roles: Joi.array().items(
        Joi.string().valid('judge', 'organizer', 'receiver')
    ).unique().min(1).required(),
}).required()

const array_schema = Joi.array().items(object_schema).min(1).required()

module.exports = Joi.alternatives().try(
    object_schema,
    array_schema
)

