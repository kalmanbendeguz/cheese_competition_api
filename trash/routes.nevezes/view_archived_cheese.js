const express = require("express");
const router = express.Router();

const check_authenticated = require("../middlewares/common/check_authenticated");
const get_session_context = require("../middlewares/common/get_session_context");
const render = require("../middlewares/common/render");

const check_archived_cheese_belongs_to_user = require("../middlewares/view_archived_cheese/check_archived_cheese_belongs_to_user");
const get_archived_cheese = require("../middlewares/view_archived_cheese/get_archived_cheese");

router.get(
  "/",
  check_authenticated,
  get_session_context,
  get_archived_cheese,
  check_archived_cheese_belongs_to_user,
  render("view_archived_cheese")
);

module.exports = router;
