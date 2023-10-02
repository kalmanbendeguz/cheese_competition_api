const Joi = require('joi')
const limited_roles = require('../../../../static/limited_roles.json')

const content_validator = Joi.object({
    email: Joi.string().email().optional(),
    allowed_roles: Joi.alternatives().try(
        Joi.array()
            .items(Joi.string().valid(...limited_roles))
            .unique()
            .min(0),
        Joi.object({
            method: Joi.string.valid('add', 'remove').required(),
            array: Joi.array()
                .items(Joi.string().valid(...limited_roles))
                .min(1)
                .required(),
        }),
    ).optional(),
})

module.exports = content_validator