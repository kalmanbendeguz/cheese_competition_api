const save_registered_user = function() {
 
    const Admin_User_Model = require('../../models/Admin_User')

    return async function(req, res, next) {
        console.log('save_registered_user')

        const user = new Admin_User_Model(res.locals.temporary_registration.user.toObject())

        await user.save()
        
        return next()
    }
}

module.exports = save_registered_user