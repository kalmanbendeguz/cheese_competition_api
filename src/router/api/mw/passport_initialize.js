const passport = require('../../../../config/passport')

module.exports = passport.initialize({
    userProperty: 'user',
    compat: true
})