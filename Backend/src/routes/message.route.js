import express from "express";
import { protectRoute } from "../middlewave/auth.middle.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controller/message.controller.js";

const router = express.Router();

// Get users for the sidebar
router.get("/users", protectRoute, getUsersForSidebar);

// Get messages between two users
router.get("/:id", protectRoute, getMessages);

// Send a new message (with optional image)
router.post("/send/:id", protectRoute, sendMessage);

export default router;
