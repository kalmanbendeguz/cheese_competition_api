const convert_email_to_username = async (req, res, next) => {

    if (!('body' in req)) return next()

    if (('username' in req.body) || !('email' in req.body)) return next()

    const find_user = require('../controllers/entities/user/find')
    const user_of_email = (await find_user(
        { filter: { email: req.body.email }, projection: { username: 1 } },
        { role: 'SERVER' },
        null
    ))?.data[0] ?? null

    if (user_of_email) {
        req.body.username = user_of_email.username
    }

    return next()
}

module.exports = convert_email_to_username