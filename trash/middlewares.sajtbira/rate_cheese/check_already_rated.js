const check_already_rated = async function (req, res, next) {
    try {
        //console.log('check_already_rated')

        const rating = await req.app.models.rating.findOne({
            secret_id: res.locals.cheese.secret_id,
            judge_email: req.user.email
        })

        if (!rating) return next()

        req.app.set_session_context(req.session, 'errors', req.app.locals.dict[res.locals.lang].cheese_already_rated)

        return res.redirect('/message_authenticated')
    } catch (err) {
        return next(err)
    }
}

module.exports = check_already_rated