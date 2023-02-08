import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
  screen: {
    type: String,
    required: true,
  },
  languages: {
    type: String,
    required: true,
  },
  certificate: {
    type: String,
    required: true,
  },
});

export const Movies = mongoose.model("movie", movieSchema);
