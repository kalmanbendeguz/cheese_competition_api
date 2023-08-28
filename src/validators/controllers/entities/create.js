const Joi = require('joi')

const create_validator = (entity) => {

    const create_one_validator = require(`./${entity}/data`)
    const create_many_validator = Joi.array().items(create_one_validator).min(1).required()
    const alternatives_validator = Joi.alternatives().try(create_one_validator, create_many_validator)

    const _create_validator = Joi.object({
        body: alternatives_validator.required(),
    }).required()

    return _create_validator
}

module.exports = create_validator