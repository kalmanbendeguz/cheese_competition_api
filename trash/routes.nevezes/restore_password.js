const express = require("express");
const router = express.Router();

const get_session_context = require("../middlewares/common/get_session_context");
const redirect = require("../middlewares/common/redirect");
const render = require("../middlewares/common/render");

const check_restore_id_valid = require("../middlewares/restore_password/check_restore_id_valid");
const check_restore_link_valid = require("../middlewares/restore_password/check_restore_link_valid");
const check_user_exists = require("../middlewares/restore_password/check_user_exists");
const delete_active_password_reset = require("../middlewares/restore_password/delete_active_password_reset");
const hash_restore_password = require("../middlewares/restore_password/hash_restore_password");
const save_restored_password = require("../middlewares/restore_password/save_restored_password");
const set_successful_password_reset_context = require("../middlewares/restore_password/set_successful_password_reset_context");
const validate_restore_password = require("../middlewares/restore_password/validate_restore_password");

router.get(
  "/",
  get_session_context,
  check_restore_link_valid,
  render("restore_password")
);

router.post(
  "/",
  validate_restore_password,
  check_restore_id_valid,
  check_user_exists,
  hash_restore_password,
  save_restored_password,
  delete_active_password_reset,
  set_successful_password_reset_context,
  redirect("/login")
);

module.exports = router;
