const Joi = require('joi')

module.exports = Joi.object({
    name: Joi.string().trim().required().min(1).max(1000).prefs({ convert: false }), // KÖ
    tax_number: Joi.string().optional().trim().min(1).max(1000).prefs({ convert: false }), // NK
    zip: Joi.string().trim().required().min(1).max(1000).prefs({ convert: false }), // KÖ
    city: Joi.string().trim().required().min(1).max(1000).prefs({ convert: false }), // KÖ
    street: Joi.string().trim().required().min(1).max(1000).prefs({ convert: false }), // KÖ
    street_type: Joi.string().optional().trim().min(1).max(1000).prefs({ convert: false }), // NK
    house_number: Joi.string().trim().required().min(1).max(1000).prefs({ convert: false }), // KÖ
    address_details: Joi.string().optional().trim().min(1).max(1000).prefs({ convert: false }), // NK
}).unknown(true)