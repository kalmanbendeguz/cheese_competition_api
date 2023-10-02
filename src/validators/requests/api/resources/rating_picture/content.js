const Joi = require('joi')
const File_Validator = require('../../../schemas/fields/File')

const content_validator = Joi.object({
    competition_id: Joi.string().trim().min(1).optional(),
    judge_id: Joi.string().trim().min(1).optional(),
    product_id: Joi.string().trim().min(1).optional(),
    rating_id: Joi.string().trim().min(1).optional(),

    picture: File_Validator(true).optional(),
})

module.exports = content_validator