const Joi = require('joi')
const valid_roles = require('../../../../static/valid_roles.json')

const data_validator = Joi.object({
    user_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
    competition_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),

    roles: Joi.alternatives().try(
        Joi.array()
            .items(
                Joi.string().valid(...valid_roles)
            )
            .unique()
            .min(1),
        Joi.object({
            method: Joi.string.valid('add', 'remove').required(),
            array: Joi.array()
                .items(
                    Joi.string().valid(...valid_roles)
                )
                .unique()
                .min(1)
                .required(),
        }),
    ).optional(),

    arrived: Joi.boolean().optional(),
    table_leader: Joi.boolean().optional(),
})

module.exports = data_validator