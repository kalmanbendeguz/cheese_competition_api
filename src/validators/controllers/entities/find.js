const Joi = require('joi')

const find_validator = (entity) => {
    const filter_validator = require(`./${entity}/filter`)

    const _find_validator = Joi.object({
        query: Joi.object({
            filter: filter_validator.optional(),

            projection: Joi.array()
                .items(
                    Joi.string().trim().min(1).prefs({ convert: false })
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