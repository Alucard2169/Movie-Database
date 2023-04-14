import movieSectionStyle from "../styles/MovieSection.module.css";
import { Roboto_Flex } from "@next/font/google";

const roboto_flex = Roboto_Flex({
  subsets: ["latin"],
  weight: ["300", "500", "700", "800"],
});

const MovieSection = ({ data }) => {
  const { images, result } = data;

  const { base_url } = images;
  const { poster_sizes } = images;

  return (
    <div
      className={`${movieSectionStyle.movieSection} ${roboto_flex.className}`}
    >
      <h2>Popular Now</h2>
      <div className={movieSectionStyle.movies}>
        {result.map((movie) => (
          <div className={movieSectionStyle.movieCard} key={movie.id}>
            <img
              src={`${base_url}/${poster_sizes[6]}/${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <div className={movieSectionStyle.lower}>
              <span className={movieSectionStyle.year}>
                {movie.release_date.slice(0, 4)}
              </span>
              <span className={movieSectionStyle.rating}>
                {movie.vote_average}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSection;
