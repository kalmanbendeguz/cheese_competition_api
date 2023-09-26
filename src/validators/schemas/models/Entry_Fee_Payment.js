const Joi = require('joi')
const { mongoose: { Types: { ObjectId }, }, } = require('mongoose')

const Confirmation_Validator = require('../fields/Entry_Fee_Payment/Confirmation')
const Barion_State_Validator = require('../fields/Entry_Fee_Payment/Barion_State')
const Value_Validator = require('../fields/Entry_Fee_Payment/Value')

const entry_fee_payment_validator = Joi.object({

    user_id: Joi.object().instance(ObjectId).required(),
    competition_id: Joi.object().instance(ObjectId).required(),

    pos_transaction_id: Joi.string()
        .trim()
        .lowercase()
        .length(32)
        .alphanum()
        .prefs({ convert: false })
        .required(),

    confirmation: Confirmation_Validator.required(),
    barion_state: Barion_State_Validator.required(),
    value: Value_Validator.required(),
    
    expiring_started: Joi.date().optional()

}).unknown(true)

module.exports = entry_fee_payment_validator