const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, "secret");
    res.cookie("token", token, { httpOnly: true });

    // Exclude password from user object
    const userWithoutPassword = await User.findById(user._id).select(
      "-password"
    );

    res
      .status(200)
      .json({ message: "Login successful", user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.Signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();

    // Encrypt the response
    const encryptedResponse = encrypt(
      JSON.stringify({ message: "User created successfully", user: newUser })
    );

    res.status(201).json(encryptedResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.Profile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
