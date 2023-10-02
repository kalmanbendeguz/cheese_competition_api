const Joi = require('joi')

const state_validator = (convert) => Joi.object({
    archived: Joi.boolean().prefs({ convert: convert }).required(),

    entry_opened: Joi.boolean()
        .when('archived', {
            is: true,
            then: Joi.valid(false),
        }).prefs({ convert: convert }).required(),
    competition_opened: Joi.boolean()
        .when('archived', {
            is: true,
            then: Joi.valid(false),
        }).prefs({ convert: convert }).required(),

    archival_date: Joi.date().when('archived', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.optional(),
    }).prefs({ convert: convert }),

    last_entry_open_date: Joi.date().when('entry_opened', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.optional(),
    }).prefs({ convert: convert }),
    last_entry_close_date: Joi.date().optional().prefs({ convert: convert }),

    last_competition_open_date: Joi.date().when('competition_opened', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.optional(),
    }).prefs({ convert: convert }),
    last_competition_close_date: Joi.date().optional().prefs({ convert: convert }),

})
    .when(Joi.object({
        entry_opened: Joi.boolean().valid(false),
        last_entry_open_date: Joi.exist(),
    }).unknown(true), {
        then: Joi.object({
            last_entry_close_date: Joi.date().required()
        }).unknown(true),
    })
    .when(Joi.object({
        competition_opened: Joi.boolean().valid(false),
        last_competition_open_date: Joi.exist(),
    }).unknown(true), {
        then: Joi.object({
            last_competition_close_date: Joi.date().required()
        }).unknown(true),
    })
    .unknown(true)

module.exports = state_validator