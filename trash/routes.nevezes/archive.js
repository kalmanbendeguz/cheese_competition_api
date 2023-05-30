const express = require("express");
const router = express.Router();

const check_authenticated = require("../middlewares/common/check_authenticated");
const get_session_context = require("../middlewares/common/get_session_context");
const render = require("../middlewares/common/render");

const get_archived_cheeses = require("../middlewares/archive/get_archived_cheeses");

router.get(
  "/",
  check_authenticated,
  get_session_context,
  get_archived_cheeses,
  render("archive")
);

module.exports = router;
