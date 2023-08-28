const Joi = require('joi')

const filter_validator = Joi.object({
    _id: Joi.any().optional(),
    email: Joi.any().optional(),
    username: Joi.any().optional(),
    hashed_password: Joi.any().optional(),
    full_name: Joi.any().optional(),
    registration_temporary: Joi.any().optional(),
    roles: Joi.any().optional(),
    confirm_registration_id: Joi.any().optional(),
    contact_phone_number: Joi.any().optional(),
    billing_information: Joi.any().optional(),
    association_member: Joi.any().optional(),
})

module.exports = filter_validator