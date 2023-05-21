const log_method_and_url = function() {

    return function(req, res, next) {
        
        if(req.url.startsWith('/assets')) return next()

        console.log(`${req.method} ${req.url}`)
        return next()
    }

}

module.exports = log_method_and_url