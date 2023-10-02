const Joi = require('joi')
const File_Validator = require('../../../schemas/fields/File')
const Category_Configuration_Validator = require('../../../schemas/fields/Competition/Category_Configuration')
const Approval_Configuration_Validator = require('../../../schemas/fields/Competition/Approval_Configuration')
const State_Validator = require('../../../schemas/fields/Competition/State')

const content_validator = Joi.object({

    name: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .optional(),
    place: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .optional(),
    ignore_extreme_values: Joi.boolean().optional(),
    certificate_template: File_Validator(true).optional(),

    category_configuration: Category_Configuration_Validator(true).optional(),
    approval_configuration: Approval_Configuration_Validator(true).optional(),
    state: State_Validator(true).optional(),
})

module.exports = content_validator