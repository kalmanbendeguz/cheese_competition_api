const check_cheese_belongs_to_user = function() {

    return function(req, res, next) {
        console.log('check_cheese_belongs_to_user')

        if(res.locals.cheese.manufacturer.equals(req.user.id)) return next()

        req.app.push_cookie_array(req, res, 'errors', 'Nincs jogosultságod ennek a sajtnak a szerkesztéséhez.')

        return res.redirect('/authenticated_message')
    }
}

module.exports = check_cheese_belongs_to_user