// backend/routes/favoriteRoutes.js
const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");

// GET /api/favorites?userId=...
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const favorites = await Favorite.find({ userId }).sort({ createdAt: -1 });
    // اگه خالی هم باشه، آرایه‌ی خالی برمی‌گردونیم
    return res.json(favorites);
  } catch (err) {
    console.error("Error fetching favorites:", err);
    res.status(500).json({ message: "Failed to load favorites." });
  }
});

// POST /api/favorites
router.post("/", async (req, res) => {
  try {
    const { userId, tmdbId, title, posterPath } = req.body;

    if (!userId || !tmdbId) {
      return res
        .status(400)
        .json({ message: "userId and tmdbId are required." });
    }

    // 👇 اگر قبلاً وجود داشته، همون رو با status 200 برگردون
    const existing = await Favorite.findOne({ userId, tmdbId });
    if (existing) {
      return res.status(200).json(existing);
    }

    const fav = await Favorite.create({
      userId,
      tmdbId,
      title,
      posterPath,
    });

    return res.status(201).json(fav);
  } catch (err) {
    console.error("Error creating favorite:", err);
    res.status(500).json({ message: "Failed to create favorite." });
  }
});

// DELETE /api/favorites/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Favorite.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Favorite not found." });
    }

    return res.json({ message: "Favorite deleted.", id });
  } catch (err) {
    console.error("Error deleting favorite:", err);
    res.status(500).json({ message: "Failed to delete favorite." });
  }
});

module.exports = router;