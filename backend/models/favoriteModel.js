// backend/models/favoriteModel.js
const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true, // بعداً از OAuth میاد
    },
    tmdbId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    posterPath: {
      type: String,
    },
    note: {
      type: String,
      maxlength: 500,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
  },
  { timestamps: true }
);

favoriteSchema.index({ userId: 1, tmdbId: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);