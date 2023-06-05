import { Movie } from "@/models/movies";

export default async function handler(req, res) {
  const { movieId } = req.query;
  try {
    const movie = await Movie.findByIdAndDelete(movieId);

    if (movie) {
      res.json({ success: true, message: "Movie deleted successfully" });
    } else {
      res.status(404).json({ success: false, error: "Movie not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}
