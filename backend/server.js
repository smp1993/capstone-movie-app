// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const connectDB = require("./config/db");

// مدل‌ها و روترها
const favoriteRoutes = require("./routes/favoriteRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
const PORT = process.env.PORT || 5050;

// اتصال به MongoDB
connectDB();

// Middleware عمومی
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://capstone-movie-app.netlify.app",
    ],
    credentials: false,
  })
);
app.use(express.json());

// سرو فایل‌های استاتیک (در صورت نیاز)
app.use(express.static(path.join(__dirname, "public")));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// ====== API Routes ======
app.use("/api/favorites", favoriteRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/reviews", reviewRoutes);

// تست خطای 500 (اختیاری)
app.get("/api/force-error", (req, res, next) => {
  next(new Error("Forced test error"));
});

// 404 - Not Found
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// 500 - Server Error
app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});