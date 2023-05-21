const check_link_valid = function() {
 
    const Admin_Temporary_Registration_Model = require('../../models/Admin_Temporary_Registration')

    return async function(req, res, next) {
        console.log('check_link_valid')

        res.locals.temporary_registration = 
            await Admin_Temporary_Registration_Model.findOne({ confirm_string: req.query.confirm_id })
        
        if(res.locals.temporary_registration) return next()

        req.app.push_cookie_array(req, res, 'errors', `Ezt a megerősítő linket már felhasználták, vagy a hozzá kapcsolódó regisztrációt felülírták.`)

        return res.redirect('/unauthenticated_message')
    }
}

module.exports = check_link_valid