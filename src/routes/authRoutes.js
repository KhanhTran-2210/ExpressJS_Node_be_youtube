import express from "express";
import {
  login,
  loginFacebook,
  signup,
} from "../controllers/authControllers.js";

const authRoutes = express();

authRoutes.post("/login", login);
authRoutes.post("/signup", signup);
authRoutes.post("/login-facebook", loginFacebook);

export default authRoutes;
