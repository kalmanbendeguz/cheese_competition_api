// ????

const Joi = require('joi')

const read_action_validator = (read_validator) => {

    const _read_action_validator = Joi.object({
        query: read_validator.required()
    }).required()

    return _read_action_validator
}

module.exports = read_action_validator