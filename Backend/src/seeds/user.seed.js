import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../model/user.model.js";

// Load environment variables
config();

// Define seed data
const seedUsers = [
  // Female Users

  {
    email: "hiruni@gmail.com",
    fullname: "Hiruni",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "ishara@gmail.com",
    fullname: "Ishara",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
  },

  {
    email: "sachini@gmail.com",
    fullname: "Sachini",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
  },

  // Male Users
  {
    email: "sandun@gmail.com",
    fullname: "Sandun",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "pasindu@gmail.com",
    fullname: "Pasindu",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "chirantha@gmail.com",
    fullname: "Chirantha",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "kavishka@gmail.com",
    fullname: "Kavishka",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "hashintha@gmail.com",
    fullname: "Hashintha",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Loop through the seed users and upsert them
    for (const user of seedUsers) {
      await User.findOneAndUpdate(
        { email: user.email }, // Find user by email
        user, // Update with the seed data
        { upsert: true, new: true } // Insert if not found
      );
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
