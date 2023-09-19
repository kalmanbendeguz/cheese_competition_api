// this is what surely does an authorized operation in the database

const authorize = (authorizer, next, processer) => async (document, actor, session) => {


    // PRODUCE
    let authorized_document
    try {
        authorized_document = await authorizer(document, actor, session)
    } catch (error) {
        throw {
            type: 'authorize_error',
            details: {
                document: document,
                error: error
            }
        }
    }


    // CALL
    const result = await next(authorized_document, session)


    // PROCESS RESULT IF OK:
    let processed_result
    try {
        processed_result = await processer(result, authorized_document)
    } catch (error) {
        throw {
            type: 'authorize_error',
            details: {
                document: document,
                error: error
            }
        }
    }

    
    // RETURN
    return processed_result
}

module.exports = authorize