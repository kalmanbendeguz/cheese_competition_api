module.exports = async function (req, res, next) {
    try {
        console.log('mw:validate_request(product/many/del/mw/validate_request)')

        // success if req is valid for this request role-independently
        // fail if invalid
        const Joi = require('joi')

        const req_validator = Joi.object({
            query: Joi.object({
                _id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
                competition_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
                manufacturer_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
                public_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
                secret_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
                product_name: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
                factory_name: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
                maturation_time_type: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
                maturation_time_quantity: Joi.number().integer().positive().optional(),
                maturation_time_unit: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
                milk_type: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
                product_category_list: Joi.array().items(
                    Joi.string().trim().min(1).prefs({ convert: false })
                ).optional().min(1),
                approved: Joi.boolean().optional(),
                approval_type: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
                handed_in: Joi.boolean().optional(),
                
            }).required()
        }).unknown(true)

        try {
            await req_validator.validateAsync(req)
        } catch (err) {
            return res.status(400).json(err.details)
        }

        return next()
    } catch (err) {
        return next(err)
    }
}