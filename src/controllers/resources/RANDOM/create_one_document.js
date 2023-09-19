const create_one_document = (model, validator) => async (fields) => {

    let document = new model(fields)

    try {
        document = await validator.validateAsync(document)
    } catch (error) {
        throw {
            type: 'create_one_document_validation_error',
            details: {
                document: document,
                error: error.details
            }
        }
    }

    return document
}

module.exports = create_one_document