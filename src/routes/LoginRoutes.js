const express = require("express");
const { Login, Signup, Profile } = require("../controllers/Auth");
const UserMiddleware = require("../middlewares/cookieMiddleware");
const authRouter = express.Router();

authRouter.post("/login", Login);
authRouter.post("/signup", Signup);
authRouter.get("/profile", UserMiddleware, Profile);

module.exports = authRouter;
