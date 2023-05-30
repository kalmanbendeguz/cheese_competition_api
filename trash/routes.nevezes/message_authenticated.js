const express = require("express");
const router = express.Router();

const get_session_context = require("../middlewares/common/get_session_context");
const render = require("../middlewares/common/render");

const check_message_authenticated = require("../middlewares/message_authenticated/check_message_authenticated");

router.get(
  "/",
  check_message_authenticated,
  get_session_context,
  render("message_authenticated")
);

module.exports = router;
