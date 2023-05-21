const set_confirm_cheese_successful_context = function (req, res, next) {
    try {
        //console.log('set_confirm_cheese_successful_context')

        req.app.set_session_context(
            req.session,
            'warnings',
            req.app.locals.dict[res.locals.lang].entried_cheese_unpaid_yet
        )

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = set_confirm_cheese_successful_context
