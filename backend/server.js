// backend/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const favoriteRoutes = require("./routes/favoriteRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
const PORT = process.env.PORT || 5050;

// اتصال به دیتابیس
connectDB();

// CORS – اجازه به لوکال و نتلیفای
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://capstone-movie-app.netlify.app",
    ],
  })
);

app.use(express.json());

// اختیاری: روت ریشه بک‌اند
app.get("/", (req, res) => {
  res.json({ message: "Capstone movie backend root" });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// API routes
app.use("/api/favorites", favoriteRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/reviews", reviewRoutes);

// 404 فقط برای روت‌های API ناشناخته
app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// 500 – خطای عمومی سرور
app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err);
  if (res.headersSent) return next(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});