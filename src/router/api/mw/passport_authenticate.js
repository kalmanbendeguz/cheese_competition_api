const passport = require('../../../../config/passport')

module.exports = (req, res, next) => {
    passport.authenticate('jwt', {
        //successRedirect: ,
        //failureRedirect: ,
        //failureFlash: ,
        //successFlash: ,
        //successMessage: ,
        //failureMessage: ,
        session: false,
        //failWithError: ,
    })
    return next()
}
