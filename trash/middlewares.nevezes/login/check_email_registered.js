const check_email_registered = async function (req, res, next) {
    try {
        //console.log('check_email_registered')

        res.locals.user = await req.app.models.user.findOne({ email: req.body?.email })

        if (res.locals.user) return next()

        const { password, ...body_without_password } = req.body
        req.app.set_session_contexts(req.session, body_without_password)
        req.app.set_session_context(req.session, 'errors', req.app.locals.dict[res.locals.lang].email_not_registered)

        return res.redirect('/login')
    } catch (err) {
        return next(err)
    }
}

module.exports = check_email_registered