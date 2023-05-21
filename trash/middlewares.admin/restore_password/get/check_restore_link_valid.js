const check_restore_link_valid = function() {
 
    const Active_Password_Reset_Model = require('../../../models/Admin_Active_Password_Reset')

    return async function(req, res, next) {
        console.log('check_restore_link_valid')

        const active_password_reset = await Active_Password_Reset_Model.findOne({ restore_id: req.query.restore_id })
        
        if(active_password_reset) {
            res.locals.restore_id = req.query.restore_id
            return next()
        }

        req.app.push_cookie_array(req, res, 'errors', 'Ez jelszó-helyreállító link lejárt, vagy nem valid!')

        return res.redirect('/unauthenticated_message')
    }
}

module.exports = check_restore_link_valid