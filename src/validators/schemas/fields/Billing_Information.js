const Joi = require('joi')

const billing_information_validator = (convert) => Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: convert })
        .required(),

    tax_number: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: convert })
        .optional(),

    zip: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: convert })
        .required(),

    city: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: convert })
        .required(),

    street: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: convert })
        .required(),

    street_type: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: convert })
        .optional(),

    house_number: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: convert })
        .required(),

    address_details: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: convert })
        .optional(),

}).unknown(true)

module.exports = billing_information_validator