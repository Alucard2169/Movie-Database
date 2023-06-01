import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export { Movie };
