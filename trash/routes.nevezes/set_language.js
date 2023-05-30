const express = require("express");
const router = express.Router();

const redirect_to_referrer = require("../middlewares/common/redirect_to_referrer");

const set_language = require("../middlewares/set_language/set_language");

router.get("/", set_language, redirect_to_referrer);

module.exports = router;
