const logout = async (req, res, next) => {

    ///
    //const action = require('../action')
    //const validator = action.validator('logout')

    // SHOULD RETURN: 
    //  {
    //      code: ...
    //      json: ...
    //  }

    ///

    // CANNOT ALTER THE SESSION, ONLY USE IT!

    // 1. Validate request
    const logout_validator = require('../../../validators/requests/api/logout')
    try {
        await logout_validator.validateAsync(req)
    } catch (err) {
        return res.status(400).json(`logout_validation_error: ${err.details}`)
    }

    // 2. Authorize action
    const authorize_action = require('../../../helpers/authorize_action')
    try {
        authorize_action('logout', req.user)
    } catch (reason) {
        return res.status(403).json(reason)
    }

    // 3. Start session and transaction
    const db = require('../../../config/db')
    const session = await db.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 4. Action
    const logout_promise = new Promise((resolve, reject) => {
        req.logout(function (error) {
            if (error) {
                reject(error)
            } else {
                resolve()
            }
        })
    })

    try {
        await logout_promise
    } catch (error) {
        if (session.inTransaction()) await session.abortTransaction()
        await session.endSession()
        return res.status(500).json(`logout_error: ${JSON.stringify(error)}`)
    }

    // 5. Commit transaction and end session
    if (session.inTransaction()) await session.commitTransaction()
    await session.endSession()

    // 6. Reply
    return res.status(200).json(`logout_successful`)
}

module.exports = logout