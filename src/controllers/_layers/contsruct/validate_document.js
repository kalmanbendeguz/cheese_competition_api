const validate_document = async (document, validator) => {
    const validated_document = await validator.validateAsync(document)
    return validated_document
}

module.exports = validate_document