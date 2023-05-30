const express = require("express");
const router = express.Router();

const check_not_authenticated = require("../middlewares/common/check_not_authenticated");
const get_session_context = require("../middlewares/common/get_session_context");
const redirect = require("../middlewares/common/redirect");
const render = require("../middlewares/common/render");

const check_email_registered = require("../middlewares/forget_password/check_email_registered");
const generate_restore_id = require("../middlewares/forget_password/generate_restore_id");
const save_password_reset = require("../middlewares/forget_password/save_password_reset");
const send_restore_password_email = require("../middlewares/forget_password/send_restore_password_email");
const set_successful_restore_email_sent = require("../middlewares/forget_password/set_successful_restore_email_sent");
const validate_forget_password = require("../middlewares/forget_password/validate_forget_password");

router.get(
  "/",
  check_not_authenticated,
  get_session_context,
  render("forget_password")
);

router.post(
  "/",
  check_not_authenticated,
  validate_forget_password,
  check_email_registered,
  generate_restore_id,
  send_restore_password_email,
  save_password_reset,
  set_successful_restore_email_sent,
  redirect("/forget_password")
);

module.exports = router;
