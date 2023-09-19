const validate_rating_document = async (validator, document_to_validate) => {
    const validated_document = await validator.validateAsync(document_to_validate)
    return validated_document
}