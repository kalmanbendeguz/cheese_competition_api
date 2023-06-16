const passport = require('../../../config/passport')

const passport_authenticate = passport.authenticate('session')

module.exports = passport_authenticate