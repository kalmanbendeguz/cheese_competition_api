const set_reset_competition_successful_cookie = function() {

    return function(req, res, next) {
        //console.log('set_reset_competition_successful_cookie')

        req.app.push_cookie_array(req, res, 'successes', `Sikeres alaphelyzetbe állítás.`)

        return next()
    }
}

module.exports = set_reset_competition_successful_cookie
