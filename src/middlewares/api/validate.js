const validate_api_endpoint = async function (req, res, next) {
    try {
        const api_request_validator = require('../../validators/requests/api')

        try {
            await api_request_validator.validateAsync(req)
        } catch (validation_error) {
            return res.status(400).json({
                type: `api_endpoint_validation_error`,
                details: {
                    method: req.method,
                    error: validation_error
                }
            })
        }

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = validate_api_endpoint