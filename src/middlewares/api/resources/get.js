const get = (find_validator, transaction_find) => async (req, res, next) => {

    let validated_request
    try {
        validated_request = await find_validator(req)
    } catch (error) {
        return res.status(400).json({
            type: 'validate_get_resource_request_error',
            details: {
                query: req.query,
                error: error
            }
        })
    }

    const filter = validated_request.query?.filter ?? null
    const projection = validated_request.query?.projection ?? null
    const options = validated_request.query?.options ?? null
    try {
        const response = await transaction_find(
            filter,
            projection,
            options,
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