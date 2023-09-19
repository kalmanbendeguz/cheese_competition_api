// this is what surely writes any data to db.
const save = (save) => async (document_to_save, session) => {
    let saved_document
    try {
        saved_document = await save(document_to_save, session)
    } catch (error) {
        throw {
            type: 'save_document_error',
            details: {
                document_to_save: document_to_save,
                error: error
            }
        }
    }
    return saved_document
}

module.exports = save