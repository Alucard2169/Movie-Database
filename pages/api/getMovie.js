import { Movie } from "@/models/movies";

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const movies = await Movie.find({ userID: id });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
