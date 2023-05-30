const express = require("express");
const router = express.Router();

const check_authenticated = require("../middlewares/common/check_authenticated");
const check_competition_opened = require("../middlewares/common/check_competition_opened");
const create_category_string = require("../middlewares/common/create_category_string");
const get_rating_sheet = require("../middlewares/common/get_rating_sheet");
const get_session_context = require("../middlewares/common/get_session_context");
const redirect = require("../middlewares/common/redirect");
const render = require("../middlewares/common/render");

const check_already_rated_confirm_rating = require("../middlewares/confirm_rating/check_already_rated_confirm_rating");
const check_cheese_handed_in = require("../middlewares/confirm_rating/check_cheese_handed_in");
const check_temporary_rating_belongs_to_judge = require("../middlewares/confirm_rating/check_temporary_rating_belongs_to_judge");
const get_cheese_confirm_rating = require("../middlewares/confirm_rating/get_cheese_confirm_rating");
const get_number_of_pictures = require("../middlewares/confirm_rating/get_number_of_pictures");
const get_temporary_rating_get = require("../middlewares/confirm_rating/get_temporary_rating_get");
const get_temporary_rating_post = require("../middlewares/confirm_rating/get_temporary_rating_post");
const get_temporary_rating_pictures_get = require("../middlewares/confirm_rating/get_temporary_rating_pictures_get");
const get_temporary_rating_pictures_post = require("../middlewares/confirm_rating/get_temporary_rating_pictures_post");
const remove_temporary_rating = require("../middlewares/confirm_rating/remove_temporary_rating");
const remove_temporary_rating_pictures = require("../middlewares/confirm_rating/remove_temporary_rating_pictures");
const save_rating = require("../middlewares/confirm_rating/save_rating");
const save_rating_pictures = require("../middlewares/confirm_rating/save_rating_pictures");
const set_successful_rating_context = require("../middlewares/confirm_rating/set_successful_rating_context");

router.get(
  "/",
  check_authenticated,
  get_session_context,
  check_competition_opened,
  get_temporary_rating_get,
  get_temporary_rating_pictures_get,
  check_temporary_rating_belongs_to_judge,
  get_cheese_confirm_rating,
  check_already_rated_confirm_rating,
  check_cheese_handed_in,
  create_category_string,
  get_rating_sheet,
  get_number_of_pictures,
  render("confirm_rating")
);

router.post(
  "/",
  check_authenticated,
  check_competition_opened,
  get_temporary_rating_post,
  get_temporary_rating_pictures_post,
  check_temporary_rating_belongs_to_judge,
  get_cheese_confirm_rating,
  check_already_rated_confirm_rating,
  check_cheese_handed_in,
  save_rating,
  save_rating_pictures,
  remove_temporary_rating,
  remove_temporary_rating_pictures,
  set_successful_rating_context,
  redirect("/")
);

module.exports = router;
