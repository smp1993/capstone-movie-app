// backend/routes/reviewRoutes.js
const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

// GET /api/reviews?userId=...
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const reviews = await Review.find({ userId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

// POST /api/reviews
router.post("/", async (req, res) => {
  try {
    const { userId, movieTitle, rating, text } = req.body;

    if (!userId || !movieTitle) {
      return res
        .status(400)
        .json({ message: "userId and movieTitle are required" });
    }

    const review = await Review.create({
      userId,
      movieTitle,
      rating,
      text,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ message: "Failed to create review" });
  }
});

// PUT /api/reviews/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { movieTitle, rating, text } = req.body;

    const review = await Review.findByIdAndUpdate(
      id,
      { movieTitle, rating, text },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).json({ message: "Failed to update review" });
  }
});

// DELETE /api/reviews/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted", id });
  } catch (err) {
    console.error("Error deleting review:", err);
    res.status(500).json({ message: "Failed to delete review" });
  }
});

module.exports = router;