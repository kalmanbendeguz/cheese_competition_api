const check_if_email_allowed_to_register = async function (req, res, next) {
    try {
        //console.log('check_if_email_allowed_to_register')

        const allowed = await req.app.models.allowed_judge.findOne({ email: req.body.email })

        if (allowed) return next()

        const { password, confirm_password, ...body_without_password } = req.body
        req.app.set_session_contexts(req.session, body_without_password)
        req.app.set_session_context(req.session, 'errors', req.app.locals.dict[res.locals.lang].email_not_allowed_to_register)

        return res.redirect('/registration')
        
    } catch (err) {
        return next(err)
    }
}

module.exports = check_if_email_allowed_to_register