module.exports = async function (req, res, next) {
    try {
        console.log('mw:validate_request(product/one/put/mw/validate_request)')
        const Joi = require('joi')

        const validator = Joi.object({
            query: Joi.object({
                _id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
                email: Joi.string().email().optional(),
            }).or('_id', 'email').required(),

            body: Joi.object({
                email: Joi.string().email().optional() // vagy igazából lehetne required is mivel csak ez az egy mező van. de mindegy is.
            }).required()
        }).unknown(true)

        try {
            await validator.validateAsync(req)
        } catch (err) {
            return res.status(400).json(err.details)
        }

        return next()
    } catch (err) {
        return next(err)
    }
}