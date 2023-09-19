const validate_document = async (document, validator) => {
    try {
        return await validator.validateAsync(document)
    } catch (error) {
        throw {
            type: 'document_validation_error',
            details: {
                document: document,
                error: error.details
            }
        }
    }
}

module.exports = validate_document