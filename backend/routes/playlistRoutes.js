// backend/routes/playlistRoutes.js
const express = require("express");
const Playlist = require("../models/Playlist");

const router = express.Router();

// GET /api/playlists?userId=xxx
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const playlists = await Playlist.find({ userId }).sort({ createdAt: -1 });
    res.json(playlists);
  } catch (err) {
    console.error("Error fetching playlists:", err);
    res.status(500).json({ message: "Failed to fetch playlists" });
  }
});

// POST /api/playlists
router.post("/", async (req, res) => {
  try {
    const { userId, name, description } = req.body;

    if (!userId || !name) {
      return res
        .status(400)
        .json({ message: "userId and name are required" });
    }

    const playlist = await Playlist.create({
      userId,
      name,
      description: description || "",
      movies: [],
    });

    res.status(201).json(playlist);
  } catch (err) {
    console.error("Error creating playlist:", err);
    res.status(500).json({ message: "Failed to create playlist" });
  }
});

// PUT /api/playlists/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const playlist = await Playlist.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.json(playlist);
  } catch (err) {
    console.error("Error updating playlist:", err);
    res.status(500).json({ message: "Failed to update playlist" });
  }
});

// DELETE /api/playlists/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const playlist = await Playlist.findByIdAndDelete(id);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.json({ message: "Playlist deleted", id });
  } catch (err) {
    console.error("Error deleting playlist:", err);
    res.status(500).json({ message: "Failed to delete playlist" });
  }
});

module.exports = router;