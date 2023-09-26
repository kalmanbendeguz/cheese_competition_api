const Joi = require('joi')
const File_Validator = require('../fields/File')
const Category_Configuration_Validator = require('../fields/Competition/Category_Configuration')
const Approval_Configuration_Validator = require('../fields/Competition/Approval_Configuration')
const State_Validator = require('../fields/Competition/State')

const competition_validator = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: false })
        .required(),
    place: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: false })
        // at schemas, there should be convert:false, because the validator cannot modify a document, it just checks.
        .required(),
    ignore_extreme_values: Joi.boolean().required(),
    certificate_template: File_Validator.required(),
    category_configuration: Category_Configuration_Validator.required(),
    approval_configuration: Approval_Configuration_Validator.required(),
    state: State_Validator.required(),
}).unknown(true)

module.exports = competition_validator