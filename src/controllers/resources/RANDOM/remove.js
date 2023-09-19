const remove = (entity) => async (query, actor, parent_session) => {

    // 1. Validate query
    const validator = require(`../../validators/controllers/entities/find`)(entity)
    try {
        await validator.validateAsync(query)
    } catch (error) {
        return {
            code: 400,
            json: {
                message: `remove_entity_query_validation_error`,
                details: {
                    entity: entity,
                    query: query,
                    error: error.details
                }
            }
        }
    }

    // 2. Start session and transaction if they don't exist
    const db = require('../../config/db')
    const session = parent_session ?? await db.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 3. Authorize remove
    const authorizer = require(`../../authorizers/entities/${entity}`)
    try {
        query.filter = await authorizer(actor, 'remove', query.filter ?? {}, session)
    } catch (reason) {
        return {
            code: 403,
            json: {
                message: `remove_entity_filter_authorization_error`,
                details: {
                    entity: entity,
                    filter: query.filter,
                    error: reason
                }
            }
        }
    }

    // 4. Remove entity
    const remove_entity = require(`./${entity}/remove`)
    const remove_entity_result = await remove_entity(query, actor, session)

    // 5. If result is NOT OK, then abort transaction and reply the result
    if (!(typeof remove_entity_result.code === 'number' && remove_entity_result.code >= 200 && remove_entity_result.code <= 299)) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return remove_entity_result
    }

    // 6. Commit transaction and end session
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 7. Reply
    return remove_entity_result
}

module.exports = remove