const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const decodedMessage = jwt.verify(token, "secret");
      console.log(decodedMessage);
      const user = await User.findById(decodedMessage.id).select("-password");
      req.user = user;
    }
    if (!token) {
      throw new Error("Unauthorized");
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = UserMiddleware;
