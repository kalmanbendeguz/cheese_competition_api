const save_password_reset = function() {
 
    const Active_Password_Reset_Model = require('../../models/Admin_Active_Password_Reset')

    return async function(req, res, next) {
        console.log('save_password_reset')

        await Active_Password_Reset_Model.findOneAndUpdate({
            email: req.body.email
        }, 
        {   
            email: req.body.email, 
            restore_id: res.locals.restore_link_identifier
        }, 
        { upsert: true }
        )

        return next()

    }
}

module.exports = save_password_reset