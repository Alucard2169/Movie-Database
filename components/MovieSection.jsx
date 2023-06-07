import Link from "next/link";
import movieSectionStyle from "../styles/MovieSection.module.css";
import { AiFillDelete } from "react-icons/ai";
import Image from "next/image";

const MovieSection = ({ data, showDeleteButton, onMovieDeleted }) => {
  const { images, result } = data;

  let handleMovieDeleted;
  if (onMovieDeleted) {
    handleMovieDeleted = onMovieDeleted.handleMovieDeleted;
  }

  const { base_url, poster_sizes } = images;

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
    <div className={movieSectionStyle.movieSection}>
      <div className={movieSectionStyle.movies}>
        {result.map((movie) => (
          <div className={movieSectionStyle.movieCard} key={movie.id}>
            <Link href={`/movie/${movie.id}`}>
              <div className={movieSectionStyle.imageSection}>
                {!movie.poster_path && <p>Image not available</p>}
                {movie.poster_path && (
                  <Image
                    src={`${base_url}/${poster_sizes[6]}/${movie.poster_path}`}
                    alt={movie.title}
                    width={500}
                    height={800}
                  />
                )}
                <span className={movieSectionStyle.rating}>
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <h3>{movie.title}</h3>
            </Link>
            <div className={movieSectionStyle.lower}>
              <span className={movieSectionStyle.year}>
                {movie.release_date.slice(0, 4)}
              </span>
              {showDeleteButton ? (
                <AiFillDelete
                  className={movieSectionStyle.icon}
                  onClick={() => handleDeleteBtn(movie._id)}
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSection;
