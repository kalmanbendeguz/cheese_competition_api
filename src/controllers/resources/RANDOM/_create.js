// this is what surely does a change in the database (transaction)

const startSession = require('...')

const create = (start_session = startSession, one_many_adapter) => async (validated_request) => {
    let session
    try {
        session = await start_session()
    } catch (error) {
        throw {
            type: 'start_session_error',
            details: {
                validated_request: validated_request,
                error: error
            }
        }
    }

    try {
        const result = await one_many_adapter(validated_request.body, validated_request.user, session)
        session.commit()
        return result
    } catch (error) {
        session.abort()
        throw {
            type: 'create_error',
            details: {
                validated_request: validated_request, // vagy body és user?
                error: error
            }
        }
    }
}

module.exports = create