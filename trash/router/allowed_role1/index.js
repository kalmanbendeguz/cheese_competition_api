const express = require("express");
const router = express.Router();

// Here will come the /product middlewares

// /o router
const one = require("./one");
router.use("/o", one);

// /m router
const many = require("./many");
router.use("/m", many);

module.exports = router;
