module.exports = async function (req, res, next) {
    try {
        console.log('mw:validate_documents(product/one/put/mw/validate_documents)')

        const allowed_judge_validator = require('../../../../../../../validators/schemas/Allowed_Judge')

        try {
            const validator_promises = res.locals.allowed_judges.map(allowed_judge =>
                allowed_judge_validator.validateAsync(allowed_judge))

            await Promise.all(validator_promises)

        } catch (err) {
            return res.status(400).json(err.details)
        }

        return next()
    } catch (err) {
        return next(err)
    }
}