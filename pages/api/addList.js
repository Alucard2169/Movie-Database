import { Movie } from "@/models/movies";

export default async function handler(req, res) {
  const { id, userId, type } = req.body;

  try {
    // Check if the movie already exists in the database
    let existingMovie = await Movie.findOne({
      movieId: id,
      userID: userId,
      type: type,
    });

    if (existingMovie) {
      throw new Error("Movie Already exists");
    } else {
      // Create a new movie object
      const newMovie = new Movie({
        movieId: id,
        userID: userId,
        type: type,
      });

      // Save the new movie to the database
      await newMovie.save();

      res.status(200).json({ movie: newMovie });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
