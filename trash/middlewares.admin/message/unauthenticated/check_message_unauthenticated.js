const check_message_unauthenticated = function() {

    return function(req, res, next) {
        console.log('check_message_unauthenticated')

        if (req.isAuthenticated()) return res.redirect('/authenticated_message')

        return next()
    }
}

module.exports = check_message_unauthenticated