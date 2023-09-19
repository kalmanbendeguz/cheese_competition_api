// this is what surely makes a consistent change in the database

const alter = (alter_entity, generate) => async (document_to_alter, session) => {
    try {
        const altered_document = await alter_entity(document_to_alter, session)
        return await generate(altered_document, session)
    } catch (error) {
        throw {
            type: 'alter_document_error',
            details: {
                document_to_alter: document_to_alter,
                error: error
            }
        }
    }
}

module.exports = alter