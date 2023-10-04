const validate_base_endpoint = async function (req, res, next) {
    try {
        const base_request_validator = require('../validators/requests')

        try {
            await base_request_validator.validateAsync(req)
        } catch (validation_error) {
            return res.status(400).json({
                type: `endpoint_validation_error`,
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

module.exports = validate_base_endpoint