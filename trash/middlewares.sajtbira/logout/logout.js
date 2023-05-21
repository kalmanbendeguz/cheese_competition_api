const logout = function (req, res, next) {
    try {
        //console.log('logout')

        req.logout(err => {
            if (err) return next(err)
            return res.redirect('/login')
        })
    } catch (err1) {
        return next(err1)
    }
}

module.exports = logout