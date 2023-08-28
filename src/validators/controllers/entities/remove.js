const Joi = require('joi')

const remove_validator = (entity) => {
    const filter_validator = require(`./${entity}/filter`)

    const _remove_validator = Joi.object({
        query: Joi.object({
            filter: filter_validator.optional(),
        }).optional()
    }).required()

    return _remove_validator
}

module.exports = remove_validator