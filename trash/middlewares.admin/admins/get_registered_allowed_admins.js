const get_registered_allowed_admins = function() {

    return async function(req, res, next) {
        console.log('get_registered_allowed_admins')
        
        for(let allowed_admin of res.locals.allowed_admins) {

            let existing_admin = res.locals.admins.find((admin) => admin.email === allowed_admin.email)

            if(typeof existing_admin !== 'undefined') {
                allowed_admin.registered = true
                allowed_admin.admin = existing_admin
            } else {
                allowed_admin.registered = false
                allowed_admin.admin = null
            }

        }
        
        return next()

    }
}

module.exports = get_registered_allowed_admins