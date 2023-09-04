const update = (entity) => async (data, actor, parent_session) => {

    // 1. Validate data
    const validator = require(`../../validators/controllers/entities/update`)(entity)
    try {
        await validator.validateAsync(data)
    } catch (error) {
        return {
            code: 400,
            json: {
                message: `update_entity_data_validation_error`,
                details: {
                    entity: entity,
                    data: data,
                    error: error.details
                }
            }
        }
    }

    // 2. Start session and transaction if they don't exist
    const db = require('../../config/db')
    const session = parent_session ?? await db.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 3. Authorize query
    const authorizer = require(`../../authorizers/entities/${entity}`)
    try {
        data.query = await authorizer(actor, 'find', data.query, session)
    } catch (reason) {
        return {
            code: 403,
            json: {
                message: `update_entity_query_authorization_error`,
                details: {
                    entity: entity,
                    query: data.query,
                    error: reason
                }
            }
        }
    }

    // 4. Authorize update
    try {
        data.body = await authorizer(actor, 'update', data.body, session)
    } catch (reason) {
        return {
            code: 403,
            json: {
                message: `update_entity_body_authorization_error`,
                details: {
                    entity: entity,
                    body: data.body,
                    error: reason
                }
            }
        }
    }

    // 5. Update entity
    const update_entity = require(`./${entity}/update`)
    const update_entity_result = await update_entity(data, actor, session)

    // 6. If result is NOT OK, then abort transaction and reply the result
    if (!(typeof update_entity_result.code === 'number' && update_entity_result.code >= 200 && update_entity_result.code <= 299)) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return update_entity_result
    }

    // 7. Authorize project
    try {
        update_entity_result.data = await Promise.all(
            update_entity_result.data.map((document) => authorizer(actor, 'project', document, session))
        )
    } catch (reason) {
        return {
            code: 500,
            json: {
                message: `update_entity_projection_authorization_error`,
                details: {
                    entity: entity,
                    data: update_entity_result.data,
                    error: reason
                }
            }
        }
    }

    // 8. Commit transaction and end session
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 9. Reply
    return update_entity_result
}

module.exports = update