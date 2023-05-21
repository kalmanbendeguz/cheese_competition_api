const uniformize_secret_id = function() {

    return function(req, res, next) {
        console.log('uniformize_secret_id')

        res.locals.secret_id = req.query.secret_id

        res.locals.secret_id = res.locals.secret_id.trim()
        res.locals.secret_id = res.locals.secret_id.replace(/[^a-z0-9]/gi, '')
        res.locals.secret_id = res.locals.secret_id.toUpperCase()

        return next()
    }
}

module.exports = uniformize_secret_id