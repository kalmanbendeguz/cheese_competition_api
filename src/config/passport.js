const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User_Model = require('../models/User')

const options = {
    secretOrKey: 'sdgdfgdfg',
    // secretOrKeyProvider: ,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // issuer: ,
    // audience: ,
    algorithms: ['RS256'],
    // ignoreExpiration: ,
    // passReqToCallback: ,
    // jsonWebTokenOptions: ,
}

const verify = async (jwt_payload, done) => {
    if (typeof jwt_payload.sub === 'undefined') return done(null, false) // vagy nem null(mert sztem ez hibának számít), de a false az biztos

    const user = await User_Model.findById(jwt_payload.sub)

    if (!user) return done(null, false)

    //const is_valid = await bcrypt.compare(password, user.hashed_password)
//
    //if (is_valid) {
    //    return done(null, user)
    //} else {
    //    return done(null, false)
    //}

    User_Model.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    })
}

//const verify_callback = async (email, password, done) => {
//    const user = await User_Model.findOne({ email: email })
//    if (!user) return done(null, false)
//    const is_valid = await bcrypt.compare(password, user.hashed_password)
//    if (is_valid) {
//        return done(null, user)
//    } else {
//        return done(null, false)
//    }
//}

const strategy = new JwtStrategy(options, verify)

//const User_Model = require('../models/User')
//const bcrypt = require('bcrypt')

//const custom_fields = {
//    usernameField: 'email',
//    passwordField: 'password'
//}
//


//const strategy = new LocalStrategy(custom_fields, verify_callback)

passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (user_id, done) => {
    User_Model.findById(user_id)
        .then((user) => {
            done(null, user)
        })
        .catch(err => done(err))
})

module.exports = passport


