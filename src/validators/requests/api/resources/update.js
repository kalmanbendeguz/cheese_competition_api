const Joi = require('joi')

const update_validator = (filter_validator, content_validator) => {

    const _update_validator = Joi.object({
        query: Joi.object({
            filter: filter_validator.optional(),
        }).optional(),
        body: Joi.object({
            content: content_validator.required()
        }).required(),
    }).required()

    return _update_validator
}

module.exports = update_validator