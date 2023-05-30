const express = require("express");
const router = express.Router();

const check_authenticated = require("../middlewares/common/check_authenticated");
const redirect = require("../middlewares/common/redirect");

router.get("/", check_authenticated, redirect("/landing"));

module.exports = router;
