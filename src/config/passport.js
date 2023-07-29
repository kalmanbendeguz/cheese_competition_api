const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User_Model = require('../models/User')
const bcrypt = require('bcrypt')

const custom_fields = {
    usernameField: 'username',
    passwordField: 'password',
}

const verify_callback = async (username, password, done) => {
    const user = await User_Model.findOne({ username: username })
    if (!user) return done(null, false)
    const password_correct = await bcrypt.compare(password, user.hashed_password)
    const roles_count = user.roles?.length ?? 0
    if (password_correct) {
        if (roles_count === 1) {
            return done(null, { _id: user._id, role: user.roles[0] })
        } else {
            return done(null, { _id: user._id, role: 'ROLELESS' })
        }
    } else {
        return done(null, false)
    }
}

const strategy = new LocalStrategy(custom_fields, verify_callback)

passport.use(strategy)

passport.serializeUser((user_in_session, done) => {
    done(null, user_in_session)
})

passport.deserializeUser(async (user_in_session, done) => {
    User_Model.findById(user_in_session._id)
        .then((user) => {
            user = user.toObject()
            done(null, { ...user, role: user_in_session.role })
        })
        .catch((err) => done(err))
})

module.exports = passport