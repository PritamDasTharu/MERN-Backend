const User = require("../model/UserModel");

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
    return res.status(200).json({ register });
  } catch (err) {
    return res
      .status(400)
      .json({ error: err.message, Message: "User not registered!" });
  }
};
