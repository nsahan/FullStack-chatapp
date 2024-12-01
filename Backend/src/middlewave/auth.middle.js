import jwt from "jsonwebtoken";
import User from "../model/user.model.js"; // Ensure correct path

export const protectRoute = async (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    // Verify the token and get the decoded payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret key

    // Find the user by the ID embedded in the token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    // Attach the user object to the request for future use
    req.user = user;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification failed", error);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};
