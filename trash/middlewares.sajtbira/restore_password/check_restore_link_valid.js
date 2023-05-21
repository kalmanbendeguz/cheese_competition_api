const check_restore_link_valid = async function (req, res, next) {
    try {
        //console.log('check_restore_link_valid')

        const active_password_reset =
            await req.app.models.judge_active_password_reset.exists({ restore_id: req.query.restore_id })

        if (active_password_reset) {
            res.locals.restore_id = req.query.restore_id
            return next()
        }

        req.app.set_session_context(req.session, 'errors', req.app.locals.dict[res.locals.lang].restore_password_link_invalid)

        return res.redirect('/message_unauthenticated')
    } catch (err) {
        return next(err)
    }
}

module.exports = check_restore_link_valid