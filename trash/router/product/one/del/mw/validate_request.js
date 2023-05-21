module.exports = async function (req, res, next) {
    try {
        console.log('mw:validate_request(product/one/del/mw/validate_request)')

        // success if req is valid for this request role-independently
        // fail if invalid
        const Joi = require('joi')

        const req_validator = Joi.object({
            query: Joi.object({
                _id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),

                public_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
                secret_id: Joi.string().trim().min(1).prefs({ convert: false }).optional()
                
            }).or('_id', 'public_id', 'secret_id').required()
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