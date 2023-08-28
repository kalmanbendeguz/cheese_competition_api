const Joi = require('joi')

const filter_validator = Joi.object({
    _id: Joi.any().optional(),
    receiver_id: Joi.any().optional(),
    competition_id: Joi.any().optional(),
})

module.exports = filter_validator