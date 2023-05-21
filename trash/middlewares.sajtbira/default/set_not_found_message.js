const set_not_found_message = function (req, res, next) {
    try {
        //console.log('set_not_found_message')

        res.locals.error = req.app.locals.dict[res.locals.lang].error_message_404

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = set_not_found_message
