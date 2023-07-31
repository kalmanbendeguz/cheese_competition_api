const Joi = require('joi')

const object_schema = Joi.object({
    product_ids: Joi.array()
        .items(Joi.string().trim().min(1).prefs({ convert: false }).required())
        .min(1)
        .required(),
    // pending // initialized to true
    // barion_payment_id // its forbidden at creation
    // barion_transaction_id // its forbidden at creation
    // amount // its forbidden at creation
    // currency // its forbidden at creation
    // pos_transaction_id // generated
    // confirm_payment_id // generated
}).required()

const array_schema = Joi.array().items(object_schema).min(1).required()

const alternatives_schema = Joi.alternatives().try(object_schema, array_schema)

module.exports = alternatives_schema