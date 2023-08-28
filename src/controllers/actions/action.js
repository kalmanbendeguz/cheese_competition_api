const action = (_action) => {

    const action_middleware = async (req, res) => {

        // 1. Validate request
        const validator = require(`../../validators/requests/api/${_action}`) // should be like: passing as argument?(require..)(_action)
        try {
            await validator.validateAsync(req)
        } catch (error) {
            return res.status(400).json({
                message: `action_validation_error`,
                details: {
                    action: _action,
                    message: error.details
                }
            })
        }

        // 2. Authorize action
        const authorizer = require('../../helpers/authorize_action')
        const authorized = authorizer(_action, req.user)
        if (!authorized) {
            return res.status(403).json({
                message: `action_unauthorized`,
                details: {
                    action: _action,
                    actor: req.user?.role ?? 'UNAUTHENTICATED'
                }
            })
        }

        // 3. Start transaction
        const db = require('../../config/db')
        const session = await db.startSession()
        if (!session.inTransaction()) session.startTransaction()

        // 4. Activity
        const activity = require(`./${_action}`)
        const activity_response = await activity(req, session)

        // 5. Commit or abort transaction
        if (session.inTransaction()) {
            if (typeof activity_response.code === 'number' && activity_response.code >= 200 && activity_response.code <= 299) {
                await session.commitTransaction()
            } else {
                await session.abortTransaction()
            }
        }
        await session.endSession()

        // 6. Reply
        return res.status(activity_response.code).json(activity_response.json)
    }

    return action_middleware
}

module.exports = action