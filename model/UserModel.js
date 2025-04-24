const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  hashed_password: { type: String, required: true },
  role: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", UserSchema);
