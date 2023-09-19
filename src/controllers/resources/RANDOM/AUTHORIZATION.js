const authorization = (authorizer, resource_controller) => async (document, actor, session) => {
    //try {
    const authorized_document = authorizer(document, actor, session)
    return await resource_controller(authorized_document, session)
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

module.exports = authorization