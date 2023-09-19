const save_document_error = (error, document /*, session: we dont care about that (but it is passed, but we omit it)*/) => {
    throw {
        type: 'save_document_error',
        details: {
            document_to_save: document,
            error: error
        }
    }
}
module.exports = save_document_error