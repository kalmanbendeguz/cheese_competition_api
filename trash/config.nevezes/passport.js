const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User_Model = require("../models/User");
const bcrypt = require("bcrypt");

const custom_fields = {
  usernameField: "email",
  passwordField: "password",
};

const verify_callback = async (email, password, done) => {
  const user = await User_Model.findOne({ email: email });
  if (!user) return done(null, false);
  const is_valid = await bcrypt.compare(password, user.hashed_password);
  if (is_valid) {
    return done(null, user);
  } else {
    return done(null, false);
  }
};

const strategy = new LocalStrategy(custom_fields, verify_callback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (user_id, done) => {
  User_Model.findById(user_id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

module.exports = passport;
