const _delete = (remove_validator, transaction_remove) => async (req, res, next) => {

    let validated_request
    try {
        validated_request = await remove_validator(req)
    } catch (error) {
        return res.status(400).json({
            type: 'validate_delete_resource_request_error',
            details: {
                query: req.query,
                error: error
            }
        })
    }

    const filter = validated_request.query?.filter ?? null
    try {
        const response = await transaction_remove(
            filter,
            req.user
        )
        return res.status(204).json(response)
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

module.exports = _delete