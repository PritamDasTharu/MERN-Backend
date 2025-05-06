const express = require("express");
const {
  register,
  verifyuser,
  resendverification,
  forgetPassword,
  changePassword,
} = require("../controller/usercontroller");

const router = express.Router();

router
  .post("/register", register)
  .get("/verify/:token", verifyuser)
  .post("/resend", resendverification)
  .post("/forgetpassword", forgetPassword)
  .post("/forgetpassword/:id", changePassword);
module.exports = router;
