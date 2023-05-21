const set_allowed_judge_added_success_cookie = function() {

    return function(req, res, next) {
        console.log('set_allowed_judge_added_success_cookie')

        req.app.push_cookie_array(req, res, 'successes', 'Sikeres hozzáadás.')
        
        return next()
    }
}

module.exports = set_allowed_judge_added_success_cookie
