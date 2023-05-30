const express = require("express");
const router = express.Router();

const validate_request = require("./mw/validate_request");
const authorize = require("./mw/authorize");
const prepare_get = require("./mw/prepare_get");
const get = require("./mw/get");
const check_dependencies = require("./mw/check_dependencies");
const prepare_update = require("./mw/prepare_update");
const update = require("./mw/update");
const validate_documents = require("./mw/validate_documents");
const update_dependencies = require("./mw/update_dependencies");
const save = require("./mw/save");
const reply = require("./mw/reply");

// default values (sync + async)
// validation: request + document
// check duplication (some fields need to be unique)

router.put(
  "/",
  validate_request,
  authorize,
  prepare_get,
  get, // get the documents from db
  check_dependencies, //OK
  prepare_update, // prepare the updated fields in a separate object (e.g. res.locals.update)
  update_dependencies,
  update, // just update
  validate_documents,
  save,
  reply
);

module.exports = router;
