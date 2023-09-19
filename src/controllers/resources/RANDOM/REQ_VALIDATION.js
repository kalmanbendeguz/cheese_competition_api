const req_validation = (validator, transaction) => async (req) => {

    const validated_request = validator(req)

    return await transaction(validated_request)

}

module.exports = req_validation