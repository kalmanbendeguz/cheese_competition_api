const Joi = require('joi')

const filter_validator = Joi.object({
    _id: Joi.any().optional(),
    name: Joi.any().optional(),
    place: Joi.any().optional(),
    ignore_extreme_values: Joi.any().optional(),
    certificate_template: Joi.any().optional(),
    category_configuration: Joi.any().optional(),
    approval_configuration: Joi.any().optional(),
    state: Joi.any().optional(),
})

module.exports = filter_validator