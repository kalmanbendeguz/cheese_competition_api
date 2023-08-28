const Joi = require('joi')
const File_Validator = require('../../../schemas/fields/File')

const data_validator = Joi.object({
    competition_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
    judge_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
    product_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
    rating_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),

    picture: File_Validator.optional(),
})

module.exports = data_validator