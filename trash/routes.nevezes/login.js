const express = require("express");
const router = express.Router();

const passport = require("passport");

const check_not_authenticated = require("../middlewares/common/check_not_authenticated");
const get_session_context = require("../middlewares/common/get_session_context");
const render = require("../middlewares/common/render");

const check_email_only_temporary = require("../middlewares/login/check_email_only_temporary");
const check_email_registered = require("../middlewares/login/check_email_registered");
const check_password_correct = require("../middlewares/login/check_password_correct");

router.get("/", check_not_authenticated, get_session_context, render("login"));

router.post(
  "/",
  check_not_authenticated,
  check_email_only_temporary,
  check_email_registered,
  check_password_correct,
  passport.authenticate("local", { successRedirect: "/landing" })
);

module.exports = router;
