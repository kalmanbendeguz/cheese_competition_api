const express = require("express");
const router = express.Router();

const check_authenticated = require("../middlewares/common/check_authenticated");
const create_category_string = require("../middlewares/common/create_category_string");
const get_rating_sheet = require("../middlewares/common/get_rating_sheet");
const get_session_context = require("../middlewares/common/get_session_context");
const render = require("../middlewares/common/render");

const check_rating_belongs_to_judge = require("../middlewares/view_rating/check_rating_belongs_to_judge");
const get_cheese_view_rating = require("../middlewares/view_rating/get_cheese_view_rating");
const get_rating = require("../middlewares/view_rating/get_rating");
const get_rating_pictures = require("../middlewares/view_rating/get_rating_pictures");
const validate_view_rating = require("../middlewares/view_rating/validate_view_rating");

router.get(
  "/",
  check_authenticated,
  get_session_context,
  validate_view_rating,
  get_rating,
  get_rating_pictures,
  check_rating_belongs_to_judge,
  get_cheese_view_rating,
  create_category_string,
  get_rating_sheet,
  render("view_rating")
);

module.exports = router;
