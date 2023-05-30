const express = require("express");
const router = express.Router();

const check_authenticated = require("../middlewares/common/check_authenticated");
const check_entry_opened = require("../middlewares/common/check_entry_opened");
const get_session_context = require("../middlewares/common/get_session_context");
const redirect = require("../middlewares/common/redirect");
const render = require("../middlewares/common/render");
const validate_new_cheese = require("../middlewares/common/validate_new_cheese");

const check_cheese_belongs_to_user_get = require("../middlewares/edit_cheese/check_cheese_belongs_to_user_get");
const check_cheese_belongs_to_user_post = require("../middlewares/edit_cheese/check_cheese_belongs_to_user_post");
const create_category_string = require("../middlewares/edit_cheese/create_category_string");
const get_cheese_get = require("../middlewares/edit_cheese/get_cheese_get");
const get_cheese_post = require("../middlewares/edit_cheese/get_cheese_post");
const load_product_tree = require("../middlewares/edit_cheese/load_product_tree");
const modify_cheese = require("../middlewares/edit_cheese/modify_cheese");
const save_modified_cheese = require("../middlewares/edit_cheese/save_modified_cheese");
const set_successful_edit_context = require("../middlewares/edit_cheese/set_successful_edit_context");

router.get(
  "/",
  check_authenticated,
  get_session_context,
  check_entry_opened,
  get_cheese_get,
  check_cheese_belongs_to_user_get,
  create_category_string,
  load_product_tree,
  render("edit_cheese")
);

router.post(
  "/",
  check_authenticated,
  check_entry_opened,
  validate_new_cheese,
  get_cheese_post,
  check_cheese_belongs_to_user_post,
  modify_cheese,
  save_modified_cheese,
  set_successful_edit_context,
  redirect("/landing")
);

module.exports = router;
