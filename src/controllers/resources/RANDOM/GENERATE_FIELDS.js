const generate_fields = (create_document) => async (body, session) => {
    //try {
    const generated_fields = `custom logic ${body}`
    return await create_document(generated_fields, session)
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

module.exports = generate_fields