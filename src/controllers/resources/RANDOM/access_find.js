// this is what surely does an authorized operation in the database

const access_find = (authorizer, resource_controller) => async (query, actor, session) => {
    let authorized_query
    try {
        authorized_query = authorizer(document, actor, session)
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

module.exports = access_find