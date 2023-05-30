const express = require("express");
const router = express.Router();

const validate_request = require("./mw/validate_request");
const authorize = require("./mw/authorize");
const prepare_get = require("./mw/prepare_get");
const get = require("./mw/get");
const check_dependencies = require("./mw/check_dependencies");
const update_dependencies = require("./mw/update_dependencies");
const remove = require("./mw/remove");
const reply = require("./mw/reply");

router.delete(
  "/",
  validate_request,
  authorize,
  prepare_get,
  get,
  check_dependencies,
  //prepare,
  update_dependencies, // we should get the document from the db if we want to remove it.
  remove,
  reply
);

module.exports = router;
