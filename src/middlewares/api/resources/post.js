const post = (create_validator, transaction_create) => async (req, res, next) => {

    let validated_request
    try {
        validated_request = await create_validator(req)
    } catch (error) {
        return res.status(400).json({
            type: 'validate_post_resource_request_error',
            details: {
                body: req.body,
                error: error
            }
        })
    }

    validated_request.body ??= {}
    validated_request.body.content ??= {}
    const contents = Array.isArray(validated_request.body.content) ? validated_request.body.content : [validated_request.body.content]

    try {
        const response = await transaction_create(
            contents,
            req.user
        )
        return res.status(201).json(response)
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

module.exports = post