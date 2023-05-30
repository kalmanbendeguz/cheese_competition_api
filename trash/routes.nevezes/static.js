const express = require("express");
const router = express.Router();

router.use(express.static("./src/static"));

module.exports = router;
