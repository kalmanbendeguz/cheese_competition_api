const passport = require('../config/passport')

const passport_initialize = passport.initialize({
    userProperty: 'user',
    compat: true,
})

module.exports = passport_initialize