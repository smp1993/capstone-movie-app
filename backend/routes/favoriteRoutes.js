// backend/routes/favoriteRoutes.js
const express = require("express");
const Favorite = require("../models/favoriteModel");

const router = express.Router();

// CREATE - اضافه کردن فیلم به علاقه‌مندی‌ها
router.post("/", async (req, res) => {
  try {
    const { userId, tmdbId, title, posterPath, note, rating } = req.body;

    if (!userId || !tmdbId || !title) {
      return res
        .status(400)
        .json({ message: "userId, tmdbId, and title are required" });
    }

    const existing = await Favorite.findOne({ userId, tmdbId });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Movie already exists in favorites" });
    }

    const favorite = await Favorite.create({
      userId,
      tmdbId,
      title,
      posterPath,
      note,
      rating,
    });

    res.status(201).json(favorite);
  } catch (error) {
    console.error("Error creating favorite:", error);
    res.status(500).json({ message: "Server error creating favorite" });
  }
});

// READ - گرفتن لیست علاقه‌مندی‌ها برای یک کاربر
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.find({ userId }).sort({ createdAt: -1 });
    res.json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Server error fetching favorites" });
  }
});

// UPDATE - آپدیت note و rating یک favorite
router.put("/:id", async (req, res) => {
  try {
    const { note, rating } = req.body;

    const favorite = await Favorite.findById(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    if (note !== undefined) favorite.note = note;
    if (rating !== undefined) favorite.rating = rating;

    await favorite.save();
    res.json(favorite);
  } catch (error) {
    console.error("Error updating favorite:", error);
    res.status(500).json({ message: "Server error updating favorite" });
  }
});

// DELETE - حذف کردن یک favorite
router.delete("/:id", async (req, res) => {
  try {
    const favorite = await Favorite.findByIdAndDelete(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }
    res.json({ message: "Favorite deleted" });
  } catch (error) {
    console.error("Error deleting favorite:", error);
    res.status(500).json({ message: "Server error deleting favorite" });
  }
});

module.exports = router;