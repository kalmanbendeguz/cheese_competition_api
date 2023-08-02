const Joi = require('joi')

const object_schema = Joi.object({
    // This is required, because a User directly won't create this document, he will use an action controller.
    // So only SERVER will use this, and this is required for SERVER.
    user_id: Joi.string().trim().min(1).prefs({ convert: false }).required(),
    // restore_id will be generated
    // expiring_started is always generated
}).required()

const array_schema = Joi.array().items(object_schema).min(1).required()

const alternatives_schema = Joi.alternatives().try(object_schema, array_schema)

module.exports = alternatives_schema