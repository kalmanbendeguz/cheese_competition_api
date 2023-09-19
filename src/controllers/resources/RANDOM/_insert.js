// this is what surely writes a valid data to db 
const insert = (validator, save) => async (document_to_insert, session) => {
    let validated_document
    try {
        validated_document = await validator(document_to_insert)
    } catch (error) {
        throw {
            type: 'insert_document_error',
            details: {
                document_to_insert: document_to_insert,
                error: error
            }
        }
    }
    return await save(validated_document, session)
}

module.exports = insert