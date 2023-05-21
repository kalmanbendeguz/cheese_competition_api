const set_successful_edit_cookie = function() {

    return function(req, res, next) {
        console.log('set_successful_edit_cookie')

        req.app.push_cookie_array(req, res, 'successes', 'Sikeres módosítás!')

        return next()
    }
}

module.exports = set_successful_edit_cookie