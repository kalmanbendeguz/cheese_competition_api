const Joi = require('joi')

const query_validator = Joi.object({
    _id: Joi.any().optional(),
    email: Joi.any().optional(),
    username: Joi.any().optional(),
    // hashed_password: can not query by this
    roles: Joi.any().optional(),
    full_name: Joi.any().optional(),
    contact_phone_number: Joi.any().optional(),
    billing_information: Joi.any().optional(),
    association_member: Joi.any().optional(),
    registration_temporary: Joi.any().optional(),
    confirm_registration_id: Joi.any().optional(),
    table_leader: Joi.any().optional(),
    arrived: Joi.any().optional(),
}).required()

module.exports = query_validator
