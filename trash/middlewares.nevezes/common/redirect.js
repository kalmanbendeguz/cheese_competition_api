const redirect = function(target) {

    return function(req, res, next) {
        try {
            //console.log('redirect')
    
            return res.redirect(target ?? '/')
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = redirect