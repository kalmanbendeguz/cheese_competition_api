const transaction = (start_session, one_many_adapter) => async (validated_request) => {
    const session = await start_session()
    return await one_many_adapter(validated_request.body, validated_request.user, session)
}

module.exports = transaction