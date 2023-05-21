const check_restore_id_valid = function() {
 
    const Active_Password_Reset_Model = require('../../../models/Admin_Active_Password_Reset')

    return async function(req, res, next) {
        console.log('check_restore_id_valid')

        res.locals.active_password_reset = await Active_Password_Reset_Model.findOne({ restore_id: req.body.restore_id })
        
        if(res.locals.active_password_reset) return next()

        req.app.push_cookie_array(req, res, 'errors', `Sajnos a link megnyitása óta a jelszó-helyreállító link lejárt. Kérlek kérj új visszaállító emailt!`)

        return res.redirect('/unauthenticated_message')
    }
}

module.exports = check_restore_id_valid