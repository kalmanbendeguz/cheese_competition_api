const express = require("express");
const router = express.Router();

const check_authenticated = require("../middlewares/common/check_authenticated");
const check_entry_opened = require("../middlewares/common/check_entry_opened");
const get_session_context = require("../middlewares/common/get_session_context");
const render = require("../middlewares/common/render");

const check_temporary_cheese_belongs_to_user = require("../middlewares/modify_new_cheese/check_temporary_cheese_belongs_to_user");
const create_category_string = require("../middlewares/modify_new_cheese/create_category_string");
const get_temporary_cheese = require("../middlewares/modify_new_cheese/get_temporary_cheese");
const load_product_tree = require("../middlewares/modify_new_cheese/load_product_tree");

router.get(
  "/",
  check_authenticated,
  get_session_context,
  check_entry_opened,
  get_temporary_cheese,
  check_temporary_cheese_belongs_to_user,
  create_category_string,
  load_product_tree,
  render("modify_new_cheese")
);

module.exports = router;
