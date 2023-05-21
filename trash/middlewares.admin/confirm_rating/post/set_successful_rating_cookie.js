const set_successful_rating_cookie = function() {

    return function(req, res, next) {
        console.log('set_successful_rating_cookie')

        req.app.push_cookie_array(req, res, 'successes', 'Sikeres értékelés.')
        
        return next()
    }
}

module.exports = set_successful_rating_cookie