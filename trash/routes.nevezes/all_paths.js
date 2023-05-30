const express = require("express");
const router = express.Router();

const cookie_parser = require("cookie-parser");
const log_method_and_url = require("../middlewares/common/log_method_and_url");
const passport = require("../config/passport");
const session_middleware = require("../middlewares/common/session");
const get_language = require("../middlewares/common/get_language");

router.use(
  express.urlencoded({ extended: true }),
  express.json(),
  cookie_parser(),
  session_middleware,
  passport.initialize(),
  passport.session(),
  get_language,
  log_method_and_url
);

module.exports = router;
