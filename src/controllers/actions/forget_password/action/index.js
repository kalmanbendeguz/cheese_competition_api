const forget_password = async (req, session) => {

    // Check if the link is valid.
    const find = require('../../entities/find.js')
    const find_user = find('user')
    const find_user_result = await find_user(
        {
            filter: req.body,
            projection: {
                _id: 1,
                email: 1
            }
        },
        { role: 'SERVER' },
        session
    )

    const user = find_user_result?.data?.[0] ?? null

    if (!user) {
        return {
            code: 200,
            json: {
                message: 'no_such_user'
            }
        }
    }

    // Create Active_Password_Reset.
    const create = require('../../entities/create.js')
    const create_active_password_reset = create('active_password_reset')
    const create_active_password_reset_result = await create_active_password_reset(
        {
            user_id: user._id.toString()
        },
        { role: 'SERVER' },
        session
    )

    if (!(typeof create_active_password_reset_result.code === 'number' && create_active_password_reset_result.code >= 200 && create_active_password_reset_result.code <= 299)) {
        return create_active_password_reset_result
    }

    // Send forget password email
    let iso_639_1_language = req?.cookies?.language ?? process.env.DEFAULT_LANGUAGE ?? 'en'
    const valid_iso_639_1_languages = require('../../../static/valid_iso_639_1_languages.json')
    if (!valid_iso_639_1_languages.includes(iso_639_1_language)) {
        iso_639_1_language = valid_iso_639_1_languages[0]
    }
    const recipient = user.email
    const get_string = require('../../../helpers/get_string')
    const title = get_string('forget_password_email_title', iso_639_1_language, null)
    const server_url = process.env.NODE_ENV === 'production' ?
        `${process.env.SERVER_URL_SCHEME}://${process.env.SERVER_URL_HOST}`
        :
        `${process.env.SERVER_URL_SCHEME}://${process.env.SERVER_URL_HOST}:${process.env.SERVER_URL_PORT}`
    const html_parameters = {
        server_url: server_url,
        restore_id: create_active_password_reset_result.data[0].restore_id
    }
    const html = get_string('forget_password_email_content', iso_639_1_language, html_parameters)

    const send_email = require('../../../helpers/send_email')
    try { await send_email(recipient, title, html) } catch (error) {
        return {
            code: 500,
            json: {
                message: 'forget_password_email_sending_failed',
                details: error
            }
        }
    }

    // 6. Reply
    return {
        code: 200,
        json: {
            message: 'email_successfully_sent',
        }
    }
}

module.exports = forget_password