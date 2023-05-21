const redirect_to_referer = function() {

    return function(req, res, next) {
        console.log('redirect_to_referer')

        if(typeof req === 'undefined' || typeof req.headers === 'undefined' || typeof req.headers.referer === 'undefined') {
            return res.redirect('/')
        }

        return res.redirect(req.headers.referer)
    }
}

module.exports = redirect_to_referer