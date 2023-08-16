const login = async (req, res, next) => {

    // 1. Validate request
    const login_validator = require('../../../validators/requests/api/login')
    try {
        await login_validator.validateAsync(req)
    } catch (err) {
        return res.status(400).json(`login_validation_error: ${JSON.stringify(err.details)}`)
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
    const passport = require('../../../config/passport')

    const find_user = require('../../entities/user/find')
    const find_user_result = (await find_user(
        {
            filter: {
                username: req.body.username,
            },
            projection: {
                username: 1,
                hashed_password: 1
            }
        },
        { role: 'SERVER' },
        session
    ))?.data ?? []

    if(find_user_result.length === 0) {
        return res.status(200).json(`no_such_user`)
    }

    const bcrypt = require('bcrypt')
    const password_correct = await bcrypt.compare(req.body.plain_password, find_user_result[0].hashed_password)
    if(!password_correct) {
        return res.status(200).json(`wrong_password`)
    }

    const login_promise = new Promise((resolve, reject) => {
        passport.authenticate('local', function (err, user, info) {
            if (err) { reject(err) }
            if (!user) { reject('no_such_user') }

            req.login(user, function (error) {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            })
        })(req, res, next)
    })

    try {
        await login_promise
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