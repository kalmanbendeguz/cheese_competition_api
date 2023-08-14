const registration = async (req, res, next) => {

    // 1. Validate request
    const registration_validator = require('../../../validators/requests/api/registration')
    try {
        await registration_validator.validateAsync(req)
    } catch (err) {
        return res.status(400).json(`registration_validation_error: ${err.details}`)
    }

    // 2. Authorize action
    const authorize_action = require('../../../helpers/authorize_action')
    try {
        authorize_action('registration', req.user)
    } catch (reason) {
        return res.status(403).json(reason)
    }

    // 3. Start session and transaction
    const db = require('../../../config/db')
    const session = await db.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 4. Action

    // Hash password
    const bcrypt = require('bcrypt')
    const salt = await bcrypt.genSalt()
    const hashed_password = await bcrypt.hash(req.body.plain_password, salt)
    req.body.hashed_password = hashed_password
    delete req.body.plain_password

    // Create user
    const create_user = require('../../entities/user/create')
    const create_user_result = await create_user(req.body, { role: 'SERVER' }, session)
    if (!(typeof create_user_result.code === 'number' && create_user_result.code >= 200 && create_user_result.code <= 299)) {
        if (session.inTransaction()) await session.abortTransaction()
        await session.endSession()
        return res.status(create_user_result.code).json(create_user_result.data)
    }

    // Find created user
    const find_user = require('../../entities/user/find')
    const find_user_result = await find_user(
        {
            filter: { email: req.body.email },
            projection: {
                email: 1,
                confirm_registration_id: 1
            }
        },
        { role: 'SERVER' },
        session
    )
    const created_user = find_user_result.data[0]

    // Send confirm registration email
    const iso_639_1_language = req?.cookies?.language ?? process.env.DEFAULT_LANGUAGE ?? 'en'
    const valid_iso_639_1_languages = require('../../../static/valid_iso_639_1_languages.json')
    if (!valid_iso_639_1_languages.includes(iso_639_1_language)) {
        if (session.inTransaction()) await session.abortTransaction()
        await session.endSession()
        return next('invalid_language_cookie')
    }

    const recipient = created_user.email
    const get_string = require('../../../helpers/get_string')
    const title = get_string('confirm_registration_email_title', iso_639_1_language, null)
    const server_url = process.env.NODE_ENV === 'production' ?
        `${process.env.SERVER_URL_SCHEME}://${process.env.SERVER_URL_HOST}`
        :
        `${process.env.SERVER_URL_SCHEME}://${process.env.SERVER_URL_HOST}:${process.env.SERVER_URL_PORT}`
    const html_parameters = {
        server_url: server_url,
        confirm_registration_id: created_user.confirm_registration_id
    }
    const html = get_string('confirm_registration_email_content', iso_639_1_language, html_parameters)

    const send_email = require('../../../helpers/send_email')
    try { await send_email(recipient, title, html) } catch (error) {
        if (session.inTransaction()) await session.abortTransaction()
        await session.endSession()
        return next(error)
    }

    // 5. Commit transaction and end session
    if (session.inTransaction()) await session.commitTransaction()
    await session.endSession()

    // 6. Reply
    return res.status(200).json(`registration_successful_please_confirm_via_email_link`)
}

module.exports = registration