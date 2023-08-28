const Joi = require('joi')

const filter_validator = Joi.object({
    _id: Joi.any().optional(),
    competition_id: Joi.any().optional(),
    judge_id: Joi.any().optional(),
    product_id: Joi.any().optional(),
    rating_id: Joi.any().optional(),
    picture: Joi.any().optional(),
})

module.exports = filter_validator