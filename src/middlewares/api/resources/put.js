const put = (update_validator, transaction_update) => async (req, res, next) => {

    let validated_request
    try {
        validated_request = await update_validator(req)
    } catch (error) {
        return res.status(400).json({
            type: 'validate_put_resource_request_error',
            details: {
                query: req.query,
                body: req.body,
                error: error
            }
        })
    }

    const filter = validated_request.query?.filter ?? null
    const content = validated_request.body.content
    try {
        const response = await transaction_update(
            filter,
            content,
            req.user
        )
        const status = response.length !== 0 ? 200 : 204
        return res.status(status).json(response)
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

module.exports = put