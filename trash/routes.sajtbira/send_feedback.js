const express = require("express");
const router = express.Router();

const get_session_context = require("../middlewares/common/get_session_context");
const redirect = require("../middlewares/common/redirect");
const render = require("../middlewares/common/render");

const check_send_feedback_authenticated = require("../middlewares/send_feedback/check_send_feedback_authenticated");
const send_feedback_email = require("../middlewares/send_feedback/send_feedback_email");
const set_successful_feedback_email_sent_context = require("../middlewares/send_feedback/set_successful_feedback_email_sent_context");
const validate_send_feedback = require("../middlewares/send_feedback/validate_send_feedback");

router.get(
  "/",
  check_send_feedback_authenticated,
  get_session_context,
  render("send_feedback")
);

router.post(
  "/",
  validate_send_feedback,
  send_feedback_email,
  set_successful_feedback_email_sent_context,
  redirect("/message_authenticated")
);

module.exports = router;
