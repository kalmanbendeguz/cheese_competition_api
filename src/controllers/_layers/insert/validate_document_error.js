const validate_document_error = (error, document /*, session: we dont care about that (but it is passed, but we omit it)*/) => {
    throw {
        type: 'validate_document_error',
        details: {
            document_to_save: document,
            error: error
        }
    }
}
module.exports = validate_document_error