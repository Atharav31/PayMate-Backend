const User = require("../models/User");

exports.Login = async (req, res) => {};

exports.Signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ email, password, name });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
