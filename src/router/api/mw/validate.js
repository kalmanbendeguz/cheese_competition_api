module.exports = async function (req, res, next) {
    try {
        const api_request_validator = require('../../../validators/requests/api')

        try {
            await api_request_validator.validateAsync(req)
        } catch (validation_error) {
            return res.status(400).json({ message: 'api_request_validation_failed', error: validation_error })
        }

        return next()
    } catch (err) {
        return next(err)
    }
}
