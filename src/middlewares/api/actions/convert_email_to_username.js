const convert_email_to_username = async (req, res, next) => {

    if (!('body' in req)) return next()

    if (('username' in req.body) || !('email' in req.body)) return next

    const find_one_user = (require('../../../controllers/resources/user')).transaction_find_one

    const user_of_email = await find_one_user(
        { email: req.body.email },
        { username: 1 },
        null,
        req.user
    )

    if (user_of_email) {
        req.body.username = user_of_email.username
        delete req.body.email
    }

    return next()
}

module.exports = convert_email_to_username