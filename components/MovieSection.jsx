import movieSectionStyle from "../styles/MovieSection.module.css";

import MovieCard from "./MovieCard";

const MovieSection = ({ data, showDeleteButton, onMovieDeleted }) => {
  const { images, result } = data;

  return (
    <div className={movieSectionStyle.movieSection}>
      <div className={movieSectionStyle.movies}>
        {result.map((movie) => (
          <MovieCard
            data={{ movie, images, showDeleteButton, onMovieDeleted }}
            key={movie.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieSection;
