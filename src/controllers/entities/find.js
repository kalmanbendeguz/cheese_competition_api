const find = (entity) => async (query, actor, parent_session) => {

    // 1. Validate query
    const validator = require(`../../validators/controllers/entities/find`)(entity)
    try {
        await validator.validateAsync(query)
    } catch (error) {
        return {
            code: 400,
            json: {
                message: `find_entity_query_validation_error`,
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

    // 3. Authorize find
    const authorizer = require(`../../authorizers/entities/${entity}`)
    try {
        query.filter = await authorizer(actor, 'find', query.filter ?? {}, session)
    } catch (reason) {
        return {
            code: 403,
            json: {
                message: `find_entity_filter_authorization_error`,
                details: {
                    entity: entity,
                    filter: query.filter,
                    error: reason
                }
            }
        }
    }

    // 4. Authorize project
    try {
        query.projection = await authorizer(actor, 'project', query.projection ?? {}, session)
    } catch (reason) {
        return {
            code: 500,
            json: {
                message: `find_entity_projection_authorization_error`,
                details: {
                    entity: entity,
                    projection: query.projection,
                    error: reason
                }
            }
        }
    }

    // 5. Find
    const model_name = entity.split('_').map(x => `${x.charAt(0).toUpperCase()}${x.slice(1)}`).join('_')
    const Model = require(`../../models/${model_name}`)
    const documents = await Model.find(
        query.filter,
        query.projection,
        { ...query.options, session: session }
    )

    // 6. Commit transaction and end session
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 7. Reply
    return {
        code: documents.length !== 0 ? 200 : 204,
        data: documents,
    }
}

module.exports = find