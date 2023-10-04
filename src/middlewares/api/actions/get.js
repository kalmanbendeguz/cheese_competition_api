const get = (action_get_validator, access_action_get) => async (req, res, next) => {

    let validated_request
    try {
        validated_request = await action_get_validator(req)
    } catch (error) {
        return res.status(400).json({
            type: 'validate_get_action_request_error',
            details: {
                query: req.query,
                error: error
            }
        })
    }

    const query = validated_request.query ?? null
    try {
        const response = await access_action_get(
            query,
            req.user
        )
        return res.status(200).json(response)
    } catch (error) {
        try {
            const convert_exception_to_http_response = require('../../../helpers/convert_exception_to_http_response')
            const http_response = convert_exception_to_http_response(error)
            return res.status(http_response.status).json(http_response.json)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = get