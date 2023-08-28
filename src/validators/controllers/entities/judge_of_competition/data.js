const Joi = require('joi')

const data_validator = Joi.object({
    judge_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
    competition_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),

    arrived: Joi.boolean().optional(),
    table_leader: Joi.boolean().optional(),
})

module.exports = data_validator