const Joi = require('joi')
const { Decimal128 } = require('mongoose')

module.exports = Joi.object({
    name: Joi.string().trim().required().min(1).max(1000).prefs({ convert: false }),
    place: Joi.string().trim().required().min(1).max(1000).prefs({ convert: false }),
    creation_date: Joi.date().required(),
    last_entry_open_date: Joi.date()
        .min(Joi.ref('creation_date'))
        .max(Joi.ref('archival_date'))
        .when('entry_opened', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.when('last_entry_close_date', {
                is: Joi.exist(),
                then: Joi.required(),
                otherwise: Joi.forbidden(),
            })
        }),
    last_entry_close_date: Joi.date().optional()
        .min(Joi.ref('creation_date'))
        .max(Joi.ref('archival_date'))
        .when('entry_opened', {
            is: true,
            then: Joi.date().max(Joi.ref('last_entry_open_date')),
        }),
    last_competition_open_date: Joi.date()
        .min(Joi.ref('creation_date'))
        .max(Joi.ref('archival_date'))
        .when('competition_opened', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.when('last_competition_close_date', {
                is: Joi.exist(),
                then: Joi.required(),
                otherwise: Joi.forbidden(),
            })
        }),
    last_competition_close_date: Joi.date().optional()
        .min(Joi.ref('creation_date'))
        .max(Joi.ref('archival_date'))
        .when('competition_opened', {
            is: true,
            then: Joi.date().max(Joi.ref('last_competition_open_date')),
        }),
    archival_date: Joi.date()
        .when('archived', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.forbidden()
        }),
    archived: Joi.boolean().required(),
    entry_opened: Joi.boolean().required(),
    competition_opened: Joi.boolean().required(),
    payment_needed: Joi.boolean().required(),
    entry_fee_amount: Joi.when('payment_needed', {
        is: true,
        then: Joi.object().instance(Decimal128).required(),
        otherwise: Joi.forbidden()
    }),
    entry_fee_currency: Joi.string().valid('HUF', 'EUR', 'USD').when('payment_needed', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.forbidden()
    }),
}).unknown(true)