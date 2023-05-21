const user_with_email_exists = async function (req, res, next) {
    try {
        //console.log('user_with_email_exists')

        const judge = await req.app.models.judge_user.findOne({ email: req.body.email })

        if (!judge) return next()
        
        const { password, confirm_password, ...body_without_password } = req.body
        req.app.set_session_contexts(req.session, body_without_password)
        req.app.set_session_context(req.session, 'errors', req.app.locals.dict[res.locals.lang].email_already_registered)

        return res.redirect('/registration')
    } catch (err) {
        return next(err)
    }
}


module.exports = user_with_email_exists