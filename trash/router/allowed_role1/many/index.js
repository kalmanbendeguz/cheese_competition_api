const express = require("express");
const router = express.Router();

const post = require("./post");
router.post("/", post);

const get = require("./get");
router.get("/", get);

const put = require("./put");
router.put("/", put);

const del = require("./del");
router.delete("/", del);

module.exports = router;
