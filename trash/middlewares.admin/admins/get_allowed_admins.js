const get_allowed_admins = function() {

    const Allowed_Admin_Model = require('../../models/Allowed_Admin')

    return async function(req, res, next) {
        try{
        console.log('get_allowed_admins')
        
        res.locals.allowed_admins = await Allowed_Admin_Model.find()
        
        return next()
        } catch (err) {
            return next(err)
        }

    }
}

module.exports = get_allowed_admins