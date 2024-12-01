import axios from "axios";

// Create an axios instance with dynamic baseURL depending on environment mode
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api" // Local development URL
      : "/api", // For production, you might want to use a full URL like 'https://your-domain.com/api'
  withCredentials: true, // Include credentials (cookies) in requests
});
