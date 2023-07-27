const login = async (req, res, next) => {

    // 1. Validate request
    const login_validator = require('../../../validators/requests/api/login')
    try {
        await login_validator.validateAsync(req)
    } catch (err) {
        return res.status(400).json(`login_validation_error: ${err.details}`)
    }

    // 2. Authorize action
    const authorize_action = require('../../../helpers/authorize_action')
    try {
        authorize_action('login', req.user)
    } catch (reason) {
        return res.status(403).json(reason)
    }

    // 3. Start session and transaction
    const db = require('../../../config/db')
    const session = await db.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 4. Action
    const login_promise = (_user) => {
        return new Promise((resolve, reject) => {
            req.login(_user, function (error) {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            })
        })
    }

    try {
        await login_promise(req.user)
    } catch (error) {
        if (session.inTransaction()) await session.abortTransaction()
        await session.endSession()
        return res.status(500).json(`login_error: ${JSON.stringify(error)}`)
    }

    // 5. Commit transaction and end session
    if (session.inTransaction()) await session.commitTransaction()
    await session.endSession()

    // 6. Reply
    return res.status(200).json(`login_successful`)
}

module.exports = login