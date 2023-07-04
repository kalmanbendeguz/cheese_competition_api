const Joi = require('joi')

const object_schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string()
        .trim()
        .alphanum()
        .min(5)
        .max(40)
        .prefs({ convert: false })
        .required(),
    hashed_password: Joi.string().min(1).required(),
    // roles should not be provided at creation.
    // full_name should not be provided at creation.
    // contact_phone_number should not be provided at creation.
    // billing_information should not be provided at creation.
    // association_member should not be provided at creation.
    // registration_temporary is internally set.
    // confirm_registration_id is generated.
    // table_leader should not be provided at creation.
    // arrived should not be provided at creation.
}).required()

const array_schema = Joi.array().items(object_schema).min(1).required()

const object_or_array = Joi.alternatives().try(object_schema, array_schema)

module.exports = object_or_array