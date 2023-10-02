const Joi = require('joi')

const create_validator = (content_validator) => {

    const create_one_validator = content_validator
    const create_many_validator = Joi.array().items(content_validator).min(1)
    const alternatives_validator = Joi.alternatives().try(
        create_one_validator.required(),
        create_many_validator.required()
    )

    const _create_validator = Joi.object({
        body: alternatives_validator.optional(), // we can just create a document if there are no required fields.
    }).required()

    return _create_validator
}

module.exports = create_validator