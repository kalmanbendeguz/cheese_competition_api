const set_successful_rating_context = function (req, res, next) {
    try {
        //console.log('set_successful_rating_context')

        req.app.set_session_context(
            req.session,
            'successes',
            req.app.locals.dict[res.locals.lang].successful_rating
        )

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = set_successful_rating_context
