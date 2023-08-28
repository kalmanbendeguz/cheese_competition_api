const Joi = require('joi')

const update_validator = (entity) => {

    const filter_validator = require(`./${entity}/filter`)
    const data_validator = require(`./${entity}/data`)

    const _update_validator = Joi.object({
        query: Joi.object({
            filter: filter_validator.optional(),
        }).optional(),
        body: data_validator.required()
    }).required()

    return _update_validator
}

module.exports = update_validator