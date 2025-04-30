const express = require("express");
const { register, verifyuser } = require("../controller/usercontroller");

const router = express.Router();

router.post("/register", register).get("/verify/:token", verifyuser);
module.exports = router;
