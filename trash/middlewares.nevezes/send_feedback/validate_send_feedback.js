const validate_send_feedback = function (req, res, next) {
    try {
        //console.log('validate_send_feedback')

        let problems = []

        if (req.body.feedback_message.length === 0) {
            problems.push(req.app.locals.dict[res.locals.lang].feedback_message_empty)
        }

        if (req.body.feedback_message.length > 100000) {
            problems.push(req.app.locals.dict[res.locals.lang].feedback_message_too_long)
        }

        if (problems.length === 0) return next()

        req.app.set_session_contexts(req.session, req.body)
        for (const problem of problems) {
            req.app.set_session_context(req.session, 'errors', problem)
        }

        return res.redirect('/message_authenticated')

    } catch (err) {
        return next(err)
    }
}

module.exports = validate_send_feedback