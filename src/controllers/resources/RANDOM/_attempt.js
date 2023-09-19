// this is what surely does an authorized operation in the database

const attempt = (authorizer, resource_controller) => async (document, actor, session) => {
    let authorized_document
    try {
        authorized_document = authorizer(document, actor, session)
    } catch (error) {
        throw {
            type: 'attempt_error',
            details: {
                document: document,
                error: error
            }
        }
    }
    return await resource_controller(authorized_document, session)
}

module.exports = attempt