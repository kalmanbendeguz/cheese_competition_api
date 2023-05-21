const set_successful_feedback_email_sent_context = function (req, res, next) {
    try {
        //console.log('set_successful_feedback_email_sent_context')

        req.app.set_session_context(
            req.session,
            'infos',
            req.app.locals.dict[res.locals.lang].thank_you_for_feedback
        )

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = set_successful_feedback_email_sent_context
