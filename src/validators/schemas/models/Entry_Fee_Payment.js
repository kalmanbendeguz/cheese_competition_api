const Joi = require('joi')
const { mongoose: { Types: { ObjectId }, }, } = require('mongoose')

const Billing_Information_Validator = require('../fields/Billing_Information')
const Confirmation_Validator = require('../fields/Entry_Fee_Payment/Confirmation')
const Barion_State_Validator = require('../fields/Entry_Fee_Payment/Barion_State')
const Value_Validator = require('../fields/Value')

const entry_fee_payment_validator = Joi.object({

    user_id: Joi.object().instance(ObjectId).optional(),
    competition_id: Joi.object().instance(ObjectId).optional(),

    barion_state: Barion_State_Validator(false).when('confirmation.pending', {
        is: false,
        then: Joi.required(),
        otherwise: Joi.optional(),
    }),

    pos_transaction_id: Joi.string()
        .trim()
        .lowercase()
        .length(32)
        .alphanum()
        .prefs({ convert: false })
        .required(),

    billing_information: Billing_Information_Validator(false).required(),
    confirmation: Confirmation_Validator(false).required(),
    value: Value_Validator(false).when('confirmation.pending', {
        is: false,
        then: Joi.required(),
        otherwise: Joi.optional(),
    }),
    expiring_started: Joi.date().optional()

}).unknown(true)

module.exports = entry_fee_payment_validator