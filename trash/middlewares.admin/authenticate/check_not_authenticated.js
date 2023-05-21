const check_not_authenticated = function() {

    return function(req, res, next) {
        console.log('check_not_authenticated')

        if (req.isAuthenticated()) return res.redirect('/')

        return next()
    }
}

module.exports = check_not_authenticated