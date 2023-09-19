const transaction = (validated_request, session, authorizer, entity) => {
    const authorized_request = authorizer(validated_request, session)
    const entity_result = entity(authorized_request, session)
}

module.exports = transaction