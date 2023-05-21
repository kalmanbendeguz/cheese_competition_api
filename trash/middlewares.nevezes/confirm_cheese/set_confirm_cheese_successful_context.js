const set_confirm_cheese_successful_context = function (req, res, next) {
    try {
        //console.log('set_confirm_cheese_successful_context')

        req.app.set_session_context(
            req.session,
            'successes',
            req.app.locals.dict[res.locals.lang].successful_entry_text
        )

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = set_confirm_cheese_successful_context
