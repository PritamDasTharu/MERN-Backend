const express = require("express");
const { pritam } = require("../controller/pritamcontroller");
const router = express();

router.get("/", pritam);

module.exports = router;
