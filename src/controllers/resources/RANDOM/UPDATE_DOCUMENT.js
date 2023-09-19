const update_document = (validator) => async (document, session) => {
    try {
        const saved_document = await save(document, session)
        return saved_document
    } catch (error) {
        throw {
            type: 'save_document_error',
            details: {
                document: document,
                error: error
            }
        }
    }

    // PRODUCE
    const validated_document = await validator(document)

    // CALL
    return await save_document(validated_document, session)

    const old = document.$clone()

    document.set(update.modify)
    for (const key of update.remove) {
        document[key] = undefined
    }

    try {
        document = await validator.validateAsync(document)
    } catch (error) {
        throw {
            type: 'update_one_document_validation_error',
            details: {
                old: old,
                new: document,
                error: error.details
            }
        }
    }

    return document
}

module.exports = update_document