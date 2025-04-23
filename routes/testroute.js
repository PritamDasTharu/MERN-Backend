const express = require("express");
const { sample, getTest } = require("../controller/testcontroller");
const router = express();

router.get("/", sample).get("/test", getTest);

module.exports = router;
