const express_session = require("express-session");
const db_url = process.env.DATABASE_URL || "mongodb://localhost/sajt";
const MongoStore = require("connect-mongo");
const session_store = MongoStore.create({
  mongoUrl: db_url,
  touchAfter: 60 * 60 * 24,
}); // sec

const session = express_session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: session_store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // ms
  },
  name: `${process.env.APPLICATION_NAME}.connect.sid.IWFZVM`,
});

module.exports = session;
