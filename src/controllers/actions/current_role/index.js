// we need: module.exports.middleware = ...

const confirm_registration = async (req, res, next) => {

    // 1. Validate request
    const confirm_registration_validator = require('../../../validators/requests/api/confirm_registration')
    try {
        await confirm_registration_validator.validateAsync(req)
    } catch (err) {
        return res.status(400).json(`confirm_registration_validation_error: ${JSON.stringify(err.details)}`)
    }

    // 2. Authorize action
    const authorize_action = require('../../../helpers/authorize_action')
    try {
        authorize_action('confirm_registration', req.user)
    } catch (reason) {
        return res.status(403).json(reason)
    }

    // 3. Start session and transaction
    const db = require('../../../config/db')
    const session = await db.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 4. Action
    // Check if the link is valid.
    const find_user = require('../../entities/user/find')
    const find_user_result = (await find_user(
        {
            filter: {
                confirm_registration_id: req.query.confirm_registration_id,
            },
            projection: { _id: 1 }
        },
        { role: 'SERVER' },
        session
    ))?.data ?? []

    if (find_user_result.length === 0) {
        if (session.inTransaction()) await session.abortTransaction()
        await session.endSession()
        return res.status(200).json(`confirm_registration_failed_link_is_invalid`)
    }

    // Activate User.
    const update_user = require('../../entities/user/update')
    const update_user_result = (await update_user(
        {
            query: {
                confirm_registration_id: req.query.confirm_registration_id,
            },
            body: {
                registration_temporary: false
            }
        },
        { role: 'SERVER' },
        session
    ))

    if (!(typeof update_user_result.code === 'number' && update_user_result.code >= 200 && update_user_result.code <= 299)) {
        if (session.inTransaction()) await session.abortTransaction()
        await session.endSession()
        return res.status(update_user_result.code).json(update_user_result.data)
    }

    // 5. Commit transaction and end session
    if (session.inTransaction()) await session.commitTransaction()
    await session.endSession()

    // 6. Reply
    return res.status(200).json(`confirm_registration_successful`)
}

module.exports = confirm_registration