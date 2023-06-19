import cardStyle from "@/styles/MovieCard.module.css";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";
import Image from "next/image";

const MovieCard = ({ data }) => {
  const { movie, images, showDeleteButton, onMovieDeleted } = data;
  const { base_url, poster_sizes } = images;
  let handleMovieDeleted;

  if (onMovieDeleted) {
    handleMovieDeleted = onMovieDeleted.handleMovieDeleted;
  }

  const handleDeleteBtn = async (movieId) => {
    try {
      const response = await fetch(
        `${window.location.origin}/api/deleteMovie?movieId=${movieId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      // Perform your delete logic based on the 'type' value
      if (data.success) {
        onMovieDeleted.handleMovieDeleted(movieId);
        // Delete was successful
        // Perform additional actions or update the UI
      } else {
        alert("process failed, try again");
        // Delete failed
        // Handle the error or display an error message
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={cardStyle.movieCard} key={movie.id}>
      <Link href={`/movie/${movie.id}`}>
        <div className={cardStyle.imageSection}>
          {!movie.poster_path && <p>Image not available</p>}
          {movie.poster_path && (
            <Image
              src={`${base_url}/${poster_sizes[6]}/${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={800}
            />
          )}
          <span className={cardStyle.rating}>
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
        <h3>{movie.title}</h3>
      </Link>
      <div className={cardStyle.lower}>
        <span className={cardStyle.year}>{movie.release_date.slice(0, 4)}</span>
        {showDeleteButton ? (
          <AiFillDelete
            className={cardStyle.icon}
            onClick={() => handleDeleteBtn(movie._id)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MovieCard;
