const Joi = require('joi')

const filter_validator = Joi.object({
    _id: Joi.any().optional(),
    judge_id: Joi.any().optional(),
    competition_id: Joi.any().optional(),
    arrived: Joi.any().optional(),
    table_leader: Joi.any().optional(),
})

module.exports = filter_validator