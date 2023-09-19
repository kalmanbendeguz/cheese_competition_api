// this is what surely handles request and surely sends a response
const convert_exception_to_http_response = require('../../helpers/convert_exception_to_http_response')

const post = (validator, create) => async (req, res, next) => {
    let validated_request
    try {
        validated_request = await validator(req)
    } catch (error) {
        return res.status(400).json({
            type: 'validate_request_error',
            details: {
                req: req,
                error: error
            }
        })
    }

    try {
        const response = await create(validated_request)
        return res.status(201).json(response)
    } catch (error) {
        try {
            const http_response = convert_exception_to_http_response(error)
            return res.status(http_response.status).json(http_response.json)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = post