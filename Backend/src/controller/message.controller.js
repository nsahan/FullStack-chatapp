import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../model/message.model.js";
import User from "../model/user.model.js";

// Get Users for Sidebar
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filterUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filterUsers);
  } catch (error) {
    console.error("Error Occurred:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Messages between two users
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error Occurred", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Send Message (with optional image upload to Cloudinary)
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    console.log("Received Message:", { text, image });

    let imageUrl = null;
    if (image) {
      // Upload to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
      console.log("Cloudinary upload response:", uploadResponse);
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    console.log("Message to be saved:", newMessage);

    await newMessage.save();
    console.log("Message saved to DB:", newMessage);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error Occurred:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
