const Joi = require('joi')
const limited_roles = require('../../../../static/limited_roles.json')

const object_schema = Joi.object({
    email: Joi.string().email().required(),
    allowed_roles: Joi.array()
        .items(Joi.string().valid(...limited_roles))
        .unique()
        .min(1)
        .required(),
}).required()

const array_schema = Joi.array().items(object_schema).min(1).required()

const alternatives_schema = Joi.alternatives().try(object_schema, array_schema)

module.exports = alternatives_schema