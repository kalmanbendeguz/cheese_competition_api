const Joi = require('joi')

const find_validator = (filter_validator) => {

    const _find_validator = Joi.object({
        query: Joi.object({
            filter: filter_validator.optional(),

            projection: Joi.array()
                .items(
                    Joi.string().trim().min(1)
                )
                .min(1)
                .unique()
                .optional(),

            options: Joi.object({
                limit: Joi.number().integer().positive().optional(),
                skip: Joi.number().integer().min(0).optional(),
                sort: Joi.object().pattern(Joi.string(), Joi.valid(1, -1)).optional(),
            }).optional(),
        }).optional()
    }).required()

    return _find_validator
}

module.exports = find_validator