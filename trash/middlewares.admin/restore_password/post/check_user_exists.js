const check_user_exists = function() {

    const Admin_User_Model = require('../../../models/Admin_User')

    return async function(req, res, next) {
        console.log('check_user_exists')

        res.locals.user = await Admin_User_Model.findOne({email: res.locals.active_password_reset.email})

        if(res.locals.user) return next()
        
        req.app.push_cookie_array(req, res, 'errors', 'A visszaállító linkhez tartozó fiók nem létezik!')

        return res.redirect('/unauthenticated_message')

    }
}

module.exports = check_user_exists