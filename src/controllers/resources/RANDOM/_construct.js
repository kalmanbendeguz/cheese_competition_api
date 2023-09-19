// this is what surely writes a model insance (so a document) to db
const construct = (model, insert) => async (document_to_construct, session) => {
    // PRODUCE
    let constructed_document
    try {
        constructed_document = model(document_to_construct)
    } catch (error) {
        throw {
            type: 'construct_document_error',
            details: {
                document_to_construct: document_to_construct,
                error: error
            }
        }
    }
    // CALL 
    const inserted_document = await insert(constructed_document, session) // dont try! if it throws error, someone else catch
    // PROCESS RESULT IF OK:
    



    return inserted_document
}

module.exports = construct