// this is what 
// this is a wrapper around crud operations. the main task of this should be to
// get the right fields from req(body, query, user, etc.) and pass them to the current c/r/u/d alter

const operation = (alter) => async (document_to_operate, session) => {
    let alter_result
    try {
        alter_result = await alter(document_to_operate, session)
    } catch (error) {
        throw {
            type: 'operation_error',
            details: {
                document_to_operate: document_to_operate,
                error: error
            }
        }
    }
    return alter_result
}

module.exports = operation