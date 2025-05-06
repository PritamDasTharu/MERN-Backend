const User = require("../model/UserModel");
const crypto = require("crypto");
const Token = require("../model/TokenModel");
const sendEmail = require("../sendEmail");
const UserModel = require("../model/UserModel");

exports.register = async (req, res) => {
  //destructuring
  try {
    const { name, email, password } = req.body;

    // destructuring nagareko bela
    // const user = user.findOne({ email: req.body.email });
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    let register = new User({
      name: name,
      email: email,
      password: password,
    });

    register = await register.save();
    if (!register) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    let token = new Token({
      token: crypto.randomBytes(16).toString("hex"),
      user: register._id,
    });

    token = await token.save();
    if (!token) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    // return res.status(200).json(token);
    const url = `localhost:9000/user/verify/${token.token}`;
    sendEmail({
      from: "noreply@gmail.com",
      to: email,
      subject: "Verification Mail",
      text: url,
      html: "<a><button>Click to Verify</button></a>",
    });
    return res.status(200).json(register);
  } catch (err) {
    return res
      .status(400)
      .json({ error: err.message, Message: "User not registered!" });
  }
};

exports.verifyuser = async (req, res) => {
  let token = await Token.findOne({ token: req.params.token });
  if (!token) {
    return res
      .status(400)
      .json({ message: "Invalid Token or Token not found" });
  }

  let verify = await User.findOne(token.user);
  if (!verify) {
    return res.status(400).json({ message: "User not found" });
  }

  if (verify.isVerified) {
    return res.status(200).json({ message: "User already veriied" });
  }
  verify.isVerified = true;
  verify = await verify.save();
  if (!verify) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ message: "User verified", user: verify });
};

exports.resendverification = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  let token = new Token({
    token: crypto.randomBytes(16).toString("hex"),
    user: user._id,
  });

  token = await token.save();
  if (!token) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  // return res.status(200).json(token);
  const url = `localhost:9000/user/verify/${token.token}`;
  sendEmail({
    from: "noreply@gmail.com",
    to: req.body.email,
    subject: "Resend Verification Mail",
    text: url,
    html: "<a><button>Click to Verify</button></a>",
  });
  return res.status(200).json({ user });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  } else {
    let token = new Token({
      token: crypto.randomBytes(16).toString("hex"),
      user: user._id,
    });

    token = await token.save();
    if (!token) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    // return res.status(200).json(token);
    const url = `localhost:9000/user/forgetpassword/${token.token}`;
    sendEmail({
      from: "noreply@gmail.com",
      to: email,
      subject: "Reset Password Mail",
      text: url,
      html: "<a><button>Click to reset your password</button></a>",
    });
    return res.status(200).json({ user });
  }
};

exports.changePassword = async (req, res) => {
  const { id } = req.params;
  let token = token.findOne({ token: id });

  if (!token) {
    return res.status(400).json({ message: "Invalid token" });
  }

  let user = User.findOne({ user: token.user });
  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }

  user.password = req.body.password;
  user = await user.save();

  if (!user) {
    return res.status(400).send({ message: "Something went wrong" });
  }

  return res.status(200).send({ message: "Password Changed", user });
};