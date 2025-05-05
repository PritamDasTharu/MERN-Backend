const express = require("express");
const {
  register,
  verifyuser,
  resendverification,
} = require("../controller/usercontroller");

const router = express.Router();

router
  .post("/register", register)
  .get("/verify/:token", verifyuser)
  .post("/resend", resendverification);
module.exports = router;
