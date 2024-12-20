const express = require("express");
const { Login, Signup } = require("../controllers/Auth");
const authRouter = express.Router();

authRouter.post("/login", Login);
authRouter.post("/signup", Signup);

module.exports = authRouter;
