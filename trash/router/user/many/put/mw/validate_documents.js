module.exports = async function (req, res, next) {
    try {
        console.log('mw:validate_documents(product/one/put/mw/validate_documents)')

        const product_validator = require('../../../../../../../validators/schemas/Product')

        try {
            const validator_promises = res.locals.products.map(product => product_validator.validateAsync(product))

            await Promise.all(validator_promises)
            
        } catch (err) {
            return res.status(400).json(err.details)
        }

        return next()
    } catch (err) {
        return next(err)
    }
}