// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();
const PORT = process.env.PORT || 5050;

// اتصال به دیتابیس
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// Favorite routes
app.use("/api/favorites", favoriteRoutes);

// هندل کردن routeهای پیدا نشدن
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});