const create_document = (model, save_document_intent) => async (document, session) => {
    //try {
    const document_instance = model(document)
    return await save_document_intent(document_instance, session)
    //} catch (error) {
    //    throw {
    //        type: 'save_document_error',
    //        details: {
    //            document: document,
    //            error: error
    //        }
    //    }
    //}
    //
    //// PRODUCE
    //const validated_document = await validator(document)
    //
    //// CALL
    //return await save_document(validated_document, session)
}

module.exports = create_document