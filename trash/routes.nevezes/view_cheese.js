const express = require("express");
const router = express.Router();

const check_authenticated = require("../middlewares/common/check_authenticated");
const get_session_context = require("../middlewares/common/get_session_context");
const render = require("../middlewares/common/render");

const check_cheese_belongs_to_user = require("../middlewares/view_cheese/check_cheese_belongs_to_user");
const get_cheese = require("../middlewares/view_cheese/get_cheese");

router.get(
  "/",
  check_authenticated,
  get_session_context,
  get_cheese,
  check_cheese_belongs_to_user,
  render("view_cheese")
);

module.exports = router;
