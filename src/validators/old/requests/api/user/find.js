const Joi = require('joi')

const query_validator = Joi.object({
    filter: Joi.object({
        _id: Joi.any().optional(),
        email: Joi.any().optional(),
        username: Joi.any().optional(),
        // hashed_password // forbidden
        roles: Joi.any().optional(),
        full_name: Joi.any().optional(),
        contact_phone_number: Joi.any().optional(),
        billing_information: Joi.any().optional(),
        association_member: Joi.any().optional(),
        registration_temporary: Joi.any().optional(),
        confirm_registration_id: Joi.any().optional(),
        table_leader: Joi.any().optional(),
        arrived: Joi.any().optional(),
    }).optional(),
    projection: Joi.object()
        .pattern(Joi.string(), Joi.valid(1).required())
        .min(1)
        .required(),
    options: Joi.object({
        limit: Joi.number().integer().positive().optional(),
        skip: Joi.number().integer().min(0).optional(),
        sort: Joi.object().pattern(Joi.string(), Joi.valid(1, -1)).optional(),
    }).optional(),
}).required()

module.exports = query_validator