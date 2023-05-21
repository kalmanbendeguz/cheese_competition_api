const log_method_and_url = function (req, res, next) {

    try {
        if (req.url.startsWith('/static')) return next()

        console.log(`${req.method} ${req.url}`)
        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = log_method_and_url