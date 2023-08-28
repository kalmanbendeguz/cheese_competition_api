const Joi = require('joi')

const query_validator = Joi.object({
    _id: Joi.any().optional(),
    rating_id: Joi.any().optional(),
    picture: Joi.any().optional(),
}).required()

module.exports = query_validator