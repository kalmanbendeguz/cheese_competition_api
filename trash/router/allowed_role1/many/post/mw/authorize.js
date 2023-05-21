module.exports = async function (req, res, next) {
    try {
        console.log('mw:authorize(product/many/post/mw/authorize)')
        // BASED ON THE USER ROLE
        // CONSIDERING ONLY THE REQUEST OBJECT,
        // IS THERE ANYTHING ILLEGAL?
        // (NO DB QUERY!)

        // since only competitors are allowed to use this endpoint, there are no additional 
        // authorization rules, by design.

        // a judge can not post any product
        if (req.user.role === 'judge') {
            return res.sendStatus(403)
        }

        // an organizer can not post any product
        if (req.user.role === 'competitor') {
            return res.sendStatus(403)
        }

        // a competitor can do everything that is allowed on this endpoint since this endpoint is only for them.
        if (req.user.role === 'organizer') {
        }

        return next()
    } catch (err) {
        return next(err)
    }
}