const check_email_only_temporary = function() {

    const Admin_Temporary_Registration_Model = require('../../models/Admin_Temporary_Registration')

    return async function(req, res, next) {
        console.log('check_email_only_temporary')

        const temporary_registration = await Admin_Temporary_Registration_Model.findOne({'user.email': req.body.email})
        
        if(!temporary_registration) return next()
        

        ;(res.locals.errors ||= []).push('Ezt a fiókot még nem aktiválták!')
        return res.render('login', { email: req.body.email })
    }
}

module.exports = check_email_only_temporary