const Joi = require('joi')

const object_schema = Joi.object({
    // restore_id will be generated
    user_id: Joi.string().trim().min(1).prefs({ convert: false }).required(), // only for SERVER  user
    // expiring_started is always generated
}).required()

const array_schema = Joi.array().items(object_schema).min(1).required()

module.exports = Joi.alternatives().try(object_schema, array_schema)
