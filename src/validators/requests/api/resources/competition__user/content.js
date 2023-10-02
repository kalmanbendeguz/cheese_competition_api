const Joi = require('joi')
const user_roles = require('../../../../static/user_roles.json')

const content_validator = Joi.object({
    user_id: Joi.string().trim().min(1).optional(),
    competition_id: Joi.string().trim().min(1).optional(),

    roles: Joi.alternatives().try(
        Joi.array()
            .items(
                Joi.string().valid(...user_roles)
            )
            .unique()
            .min(0),
        Joi.object({
            method: Joi.string.valid('add', 'remove').required(),
            array: Joi.array()
                .items(Joi.string().valid(...user_roles))
                .min(1)
                .required(),
        }),
    ).optional(),

    arrived: Joi.boolean().optional(),
    table_leader: Joi.boolean().optional(),
})

module.exports = content_validator