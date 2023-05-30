const express = require("express");
const router = express.Router();

const check_authenticated = require("../middlewares/common/check_authenticated");
const check_competition_opened = require("../middlewares/common/check_competition_opened");
const create_category_string = require("../middlewares/common/create_category_string");
const get_rating_sheet = require("../middlewares/common/get_rating_sheet");
const get_session_context = require("../middlewares/common/get_session_context");
const render = require("../middlewares/common/render");

const check_already_rated = require("../middlewares/rate_cheese/check_already_rated");
const check_cheese_handed_in = require("../middlewares/rate_cheese/check_cheese_handed_in");
const create_rating_object = require("../middlewares/rate_cheese/create_rating_object");
const generate_confirm_rating_link = require("../middlewares/rate_cheese/generate_confirm_rating_link");
const get_cheese_get = require("../middlewares/rate_cheese/get_cheese_get");
const get_cheese_post = require("../middlewares/rate_cheese/get_cheese_post");
const multer_decode = require("../middlewares/rate_cheese/multer_decode");
const redirect_to_confirm_rating = require("../middlewares/rate_cheese/redirect_to_confirm_rating");
const save_temporary_pictures = require("../middlewares/rate_cheese/save_temporary_pictures");
const save_temporary_rating = require("../middlewares/rate_cheese/save_temporary_rating");
const uniformize_secret_id = require("../middlewares/rate_cheese/uniformize_secret_id");
const validate_rating = require("../middlewares/rate_cheese/validate_rating");
const validate_secret_id = require("../middlewares/rate_cheese/validate_secret_id");

router.get(
  "/",
  check_authenticated,
  get_session_context,
  check_competition_opened,
  validate_secret_id,
  uniformize_secret_id,
  get_cheese_get,
  check_already_rated,
  check_cheese_handed_in,
  create_category_string,
  get_rating_sheet,
  render("rate_cheese")
);

router.post(
  "/",
  check_authenticated,
  multer_decode,
  validate_rating,
  check_competition_opened,
  get_cheese_post,
  check_already_rated,
  check_cheese_handed_in,
  create_category_string,
  get_rating_sheet,
  create_rating_object,
  generate_confirm_rating_link,
  save_temporary_rating,
  save_temporary_pictures,
  redirect_to_confirm_rating
);

module.exports = router;
