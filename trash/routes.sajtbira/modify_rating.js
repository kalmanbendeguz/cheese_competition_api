const express = require("express");
const router = express.Router();

const check_authenticated = require("../middlewares/common/check_authenticated");
const check_competition_opened = require("../middlewares/common/check_competition_opened");
const create_category_string = require("../middlewares/common/create_category_string");
const get_rating_sheet = require("../middlewares/common/get_rating_sheet");
const get_session_context = require("../middlewares/common/get_session_context");
const render = require("../middlewares/common/render");

const check_already_rated = require("../middlewares/modify_rating/check_already_rated");
const check_cheese_handed_in = require("../middlewares/modify_rating/check_cheese_handed_in");
const check_temporary_rating_belongs_to_judge_modify_rating = require("../middlewares/modify_rating/check_temporary_rating_belongs_to_judge_modify_rating");
const get_cheese_modify_rating = require("../middlewares/modify_rating/get_cheese_modify_rating");
const get_number_of_pictures = require("../middlewares/modify_rating/get_number_of_pictures");
const get_temporary_rating_modify_rating = require("../middlewares/modify_rating/get_temporary_rating_modify_rating");
const get_temporary_rating_pictures_get = require("../middlewares/modify_rating/get_temporary_rating_pictures_get");
const validate_modify_rating = require("../middlewares/modify_rating/validate_modify_rating");

router.get(
  "/",
  check_authenticated,
  get_session_context,
  check_competition_opened,
  validate_modify_rating,
  get_temporary_rating_modify_rating,
  get_temporary_rating_pictures_get,
  check_temporary_rating_belongs_to_judge_modify_rating,
  get_cheese_modify_rating,
  check_already_rated,
  check_cheese_handed_in,
  create_category_string,
  get_rating_sheet,
  get_number_of_pictures,
  render("modify_rating")
);

module.exports = router;
