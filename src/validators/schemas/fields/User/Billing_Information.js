const Joi = require('joi')

const billing_information_validator = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: false })
        .required(),

    tax_number: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: false })
        .optional(),

    zip: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: false })
        .required(),

    city: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: false })
        .required(),

    street: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: false })
        .required(),

    street_type: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: false })
        .optional(),

    house_number: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: false })
        .required(),

    address_details: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .prefs({ convert: false })
        .optional(),

}).unknown(true)

module.exports = billing_information_validator