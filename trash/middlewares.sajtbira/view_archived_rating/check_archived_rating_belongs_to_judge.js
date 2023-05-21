const check_archived_rating_belongs_to_judge = function (req, res, next) {
    try {
        //console.log('check_archived_rating_belongs_to_judge')

        if (res.locals.rating.judge_email === req.user.email) return next()

        req.app.set_session_context(req.session, 'errors', req.app.locals.dict[res.locals.lang].archived_rating_does_not_belong_to_user)

        return res.redirect('/message_authenticated')
    } catch (err) {
        return next(err)
    }
}

module.exports = check_archived_rating_belongs_to_judge