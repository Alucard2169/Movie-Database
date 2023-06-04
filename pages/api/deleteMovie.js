import { Movie } from "@/models/movies";

export default async function handler(req, res) {
  console.log(req.query);
  const { movieId } = req.query;
  try {
    console.log(movieId);
    const movie = await Movie.findByIdAndDelete(movieId);

    if (movie) {
      console.log(movie);
      res.json({ success: true, message: "Movie deleted successfully" });
    } else {
      res.status(404).json({ success: false, error: "Movie not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}
