import Link from "next/link";
import movieSectionStyle from "../styles/MovieSection.module.css";

const MovieSection = ({ data }) => {
  const { images, result } = data;

  const { base_url } = images;
  const { poster_sizes } = images;

  return (
    <div className={movieSectionStyle.movieSection}>
      <div className={movieSectionStyle.movies}>
        {result.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <div className={movieSectionStyle.movieCard}>
              <div className={movieSectionStyle.imageSection}>
                {!movie.poster_path && <p>Image not available</p>}
                {movie.poster_path && (
                  <img
                    src={`${base_url}/${poster_sizes[6]}/${movie.poster_path}`}
                    alt={movie.title}
                  />
                )}
                <span className={movieSectionStyle.rating}>
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <h3>{movie.title}</h3>
              <div className={movieSectionStyle.lower}>
                <span className={movieSectionStyle.year}>
                  {movie.release_date.slice(0, 4)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieSection;
