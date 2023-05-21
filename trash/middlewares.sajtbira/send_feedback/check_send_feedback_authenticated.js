const check_send_feedback_authenticated = function (req, res, next) {
    try {
        //console.log('check_send_feedback_authenticated')

        if (!req.isAuthenticated?.() ?? true) return next()

        res.locals.user = req.user

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = check_send_feedback_authenticated