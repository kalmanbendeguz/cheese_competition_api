const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User_Model = require('../models/User')

const custom_fields = {
    usernameField: 'username',
    passwordField: 'password',
}

const verify_callback_with_request = async (req, username, password, done) => {
    const user = await User_Model.findOne({ username: username })
    if (!user) return done(null, false)
    const password_correct = await bcrypt.compare(password, user.hashed_password)
    const has_role = user.roles.includes(req.body.desired_role) // TODO (no todo, just to find: send this desired role field at login)
    if (password_correct && has_role) {
        return done(null, { ...user, role: req.body.desired_role })
    } else {
        return done(null, false)
    }
}

const strategy = new LocalStrategy(custom_fields, verify_callback_with_request)

passport.use(strategy)

passport.serializeUser((user, done) => { // question: is this user the output of the verify callback? if yes, it has the 'role' property. if not, then should take it from the request ( this method has an overload where i can pass the request object)
    //done(null, { _id: user._id, role: req.body.desired_role }) // something like this if the other way does not work
    done(null, { _id: user._id, role: user.role })
})

passport.deserializeUser(async (user_in_session, done) => {
    User_Model.findById(user_in_session._id)
        .then((user) => {
            done(null, { ...user, role: user_in_session.role })
        })
        .catch((err) => done(err))
})

module.exports = passport