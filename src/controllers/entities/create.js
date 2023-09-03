const create = (entity) => async (body, actor, parent_session) => {

    // 1. Validate body
    const validator = require(`../../validators/controllers/entities/create`)(entity)
    try {
        await validator.validateAsync(body)
    } catch (error) {
        return {
            code: 400,
            json: {
                message: `create_entity_body_validation_error`,
                details: {
                    entity: entity,
                    body: body,
                    error: error.details
                }
            }
        }
    }

    // 2. Arrayize
    body = Array.isArray(body) ? body : [body]

    // 3. Start session and transaction if they don't exist
    const db = require('../../config/db')
    const session = parent_session ?? await db.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 4. Authorize create
    const authorizer = require(`../../authorizers/entities/${entity}`)
    try {
        body = await Promise.all(body.map((document) => authorizer(actor, 'create', document, session)))
    } catch (reason) {
        return {
            code: 403,
            json: {
                message: `create_entity_authorization_error`,
                details: {
                    entity: entity,
                    body: body,
                    error: reason
                }
            }
        }
    }

    // 5. Create entity
    const create_entity = require(`./${entity}/create`)
    const create_entity_result = await create_entity(body, actor, session)

    // 6. If result is NOT OK, then abort transaction and reply the result
    if (!(typeof create_entity_result.code === 'number' && create_entity_result.code >= 200 && create_entity_result.code <= 299)) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return create_entity_result
    }

    // 7. Authorize project
    try {
        create_entity_result.data = await Promise.all(
            create_entity_result.data.map((document) => authorizer(actor, 'project', document, session))
        )
    } catch (reason) {
        return {
            code: 403,
            json: {
                message: `create_entity_projection_authorization_error`,
                details: {
                    entity: entity,
                    data: create_entity_result.data,
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
    return create_entity_result
}

module.exports = create 