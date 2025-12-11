// backend/routes/favoriteRoutes.js
const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");

// GET /api/favorites?userId=...
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const favorites = await Favorite.find(filter).sort({ createdAt: -1 });
    res.json(favorites);
  } catch (err) {
    console.error("Error fetching favorites:", err);
    res.status(500).json({ message: "Failed to fetch favorites" });
  }
});

// POST /api/favorites  (idempotent)
router.post("/", async (req, res) => {
  try {
    const { userId, tmdbId, title, posterPath } = req.body;

    if (!userId || !tmdbId || !title) {
      return res
        .status(400)
        .json({ message: "userId, tmdbId, and title are required" });
    }

    // اگر قبلاً برای این user همین فیلم ذخیره شده، همونو برگردون
    const existing = await Favorite.findOne({ userId, tmdbId });
    if (existing) {
      return res.json(existing); // 200, بدون ارور
    }

    const favorite = await Favorite.create({
      userId,
      tmdbId,
      title,
      posterPath,
    });

    res.status(201).json(favorite);
  } catch (err) {
    console.error("Error creating favorite:", err);
    res.status(500).json({ message: "Failed to create favorite" });
  }
});

// DELETE /api/favorites/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Favorite.findByIdAndDelete(id);
    res.json({ message: "Favorite deleted" });
  } catch (err) {
    console.error("Error deleting favorite:", err);
    res.status(500).json({ message: "Failed to delete favorite" });
  }
});

module.exports = router;