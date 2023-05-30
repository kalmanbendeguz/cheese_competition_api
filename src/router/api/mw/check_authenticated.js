module.exports = (req, res, next) => {
    //console.log('check_authenticated')

    // EZT A SORT VISSZAÁLLÍTANI
    //if (!req.isAuthenticated?.() ?? true) return res.status(401).json({message: 'not authenticated'})//return res.redirect('/login')

    //res.locals.user = req.user
    req.user = {
        id: 'sdfsdfgfd',
        username: 'dsgdfgdfgd',
        role: ['competitor'],
    }
    return next()
}
