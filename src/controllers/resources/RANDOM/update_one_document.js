const update_one_document = (validator) => async (document, update) => {

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

module.exports = update_one_document