const check_email_only_temporary = async function (req, res, next) {
    try {
        //console.log('check_email_only_temporary')

        const temporary_registration =
            await req.app.models.judge_temporary_registration.exists({ 'user.email': req.body.email })

        if (!temporary_registration) return next()

        const { password, ...body_without_password } = req.body
        req.app.set_session_contexts(req.session, body_without_password)
        req.app.set_session_context(req.session, 'errors', req.app.locals.dict[res.locals.lang].account_not_activated_yet)

        return res.redirect('/login')
    } catch (err) {
        return next(err)
    }
}

module.exports = check_email_only_temporary