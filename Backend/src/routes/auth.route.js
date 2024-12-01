import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
  checkAuth,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middlewave/auth.middle.js";

const router = express.Router();

// Authentication routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Protected routes
router.put("/update", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;
