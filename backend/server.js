// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const connectDB = require("./config/db");
const favoriteRoutes = require("./routes/favoriteRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
const PORT = process.env.PORT || 5050;

// اتصال به دیتابیس
connectDB();

// Middleware عمومی
app.use(cors());
app.use(express.json());

// سرو فایل‌های استاتیک از پوشه public
app.use(express.static(path.join(__dirname, "public")));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// API routes
app.use("/api/favorites", favoriteRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/reviews", reviewRoutes);

// (اختیاری) route برای تست ارور 500
app.get("/api/force-error", (req, res, next) => {
  next(new Error("Forced test error"));
});

// 404 - Not Found (برای routeهایی که هیچ‌جا match نشدن)
app.use((req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "public", "errors", "404.html"));
});

// 500 - Server Error (برای خطاهای غیرمنتظره)
app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err);

  if (res.headersSent) {
    return next(err);
  }

  res
    .status(500)
    .sendFile(path.join(__dirname, "public", "errors", "500.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});