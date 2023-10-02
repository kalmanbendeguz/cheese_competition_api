const Joi = require('joi')

const Billing_Information_Validator = require('../../../schemas/fields/Billing_Information')
const Confirmation_Validator = require('../../../schemas/fields/Entry_Fee_Payment/Confirmation')
const Barion_State_Validator = require('../../../schemas/fields/Entry_Fee_Payment/Barion_State')
const Value_Validator = require('../../../schemas/fields/Value')

const content_validator = Joi.object({

    user_id: Joi.string().trim().min(1).optional(),
    competition_id: Joi.string().trim().min(1).optional(),

    barion_state: Barion_State_Validator(true).optional(),

    pos_transaction_id: Joi.string()
        .trim()
        .lowercase()
        .length(32)
        .alphanum()
        .optional(),

    billing_information: Billing_Information_Validator(true).optional(),
    confirmation: Confirmation_Validator(true).optional(),
    value: Value_Validator(true).optional(),
    expiring_started: Joi.date().optional()
})

module.exports = content_validator