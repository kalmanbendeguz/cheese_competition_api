const check_original_password_correct = function() {

    const bcrypt = require('bcrypt')
    const Admin_User_Model = require('../../../models/Admin_User')

    return async function(req, res, next) {
        console.log('check_original_password_correct')

        const original_password = (await Admin_User_Model.findOne(
            {
                email: req.user.email
            }, 
                `   
                hashed_password
                `
            )).hashed_password

        const is_password_correct = await bcrypt.compare(req.body.password, original_password)

        if(is_password_correct) return next()

        req.app.push_cookie_array(req, res, 'errors', 'Az eredeti jelszó hibás!')

        return res.redirect('/settings/password')

    }
}

module.exports = check_original_password_correct