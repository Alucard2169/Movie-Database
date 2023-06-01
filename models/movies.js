import mongoose from "mongoose";

const movieScheme = new mongoose.Schema({
  favorite: {
    type: Object,
  },
  list: {
    type: Object,
  },
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieScheme);

export { Movie };
