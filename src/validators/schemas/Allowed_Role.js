const Joi = require('joi')

module.exports = Joi.object({
    email: Joi.string().email().required(),
    allowed_roles: Joi.array()
        .items(Joi.string().valid('judge', 'organizer', 'receiver'))
        .unique()
        .min(1)
        .required(),
}).unknown(true)
