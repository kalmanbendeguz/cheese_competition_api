const transaction = (validated_request, startSession, Intent) => {
    const session = startSession(validated_request)
    const intent_result = Intent(validated_request, session)
    if(!intent_result.ok) session.abort
    session.commit
    return intent_result
}

module.exports = transaction