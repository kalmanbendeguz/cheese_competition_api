const express = require("express");
const router = express.Router();

const check_authenticated = require("../middlewares/common/check_authenticated");
const get_session_context = require("../middlewares/common/get_session_context");
const redirect = require("../middlewares/common/redirect");
const render = require("../middlewares/common/render");

// general settings
const get_general_settings = require("../middlewares/settings/general/get_general_settings");
const save_general_settings = require("../middlewares/settings/general/save_general_settings");
const set_save_general_settings_successful_context = require("../middlewares/settings/general/set_save_general_settings_successful_context");
const validate_general_settings = require("../middlewares/settings/general/validate_general_settings");

// password settings
const check_original_password_correct = require("../middlewares/settings/password/check_original_password_correct");
const hash_set_password = require("../middlewares/settings/password/hash_set_password");
const save_set_password = require("../middlewares/settings/password/save_set_password");
const set_save_password_settings_successful_context = require("../middlewares/settings/password/set_save_password_settings_successful_context");
const validate_password_settings = require("../middlewares/settings/password/validate_password_settings");

router.get("/", check_authenticated, redirect("/settings/general"));

router.get(
  "/general",
  check_authenticated,
  get_session_context,
  get_general_settings,
  render("settings_general")
);

router.post(
  "/general",
  check_authenticated,
  validate_general_settings,
  save_general_settings,
  set_save_general_settings_successful_context,
  redirect("/settings/general")
);

router.get(
  "/password",
  check_authenticated,
  get_session_context,
  render("settings_password")
);

router.post(
  "/password",
  check_authenticated,
  check_original_password_correct,
  validate_password_settings,
  hash_set_password,
  save_set_password,
  set_save_password_settings_successful_context,
  redirect("/settings/password")
);

module.exports = router;
