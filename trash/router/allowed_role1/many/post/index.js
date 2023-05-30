const express = require("express");
const router = express.Router();

const validate_request = require("./mw/validate_request");
const authorize = require("./mw/authorize");
const check_dependencies = require("./mw/check_dependencies");
const prepare = require("./mw/prepare");
const create = require("./mw/create");
const validate_documents = require("./mw/validate_documents");
const save = require("./mw/save");
const update_dependencies = require("./mw/update_dependencies");
const reply = require("./mw/reply");

// default values (sync + async)
// validation: request + document
// check duplication (some fields need to be unique)

router.post(
  "/",
  validate_request, //ok
  authorize, //ok
  check_dependencies, //ok
  prepare, // ok
  create, // ok
  validate_documents, // ok
  update_dependencies, // ok
  save,
  reply
);

module.exports = router;
