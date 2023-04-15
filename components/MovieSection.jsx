import Link from "next/link";
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
      <h2>Popular Now In Movies</h2>
      <div className={movieSectionStyle.movies}>
        {result.map((movie) => (
          <Link
            href={`/movie/${movie.id}`}
            as={`/movie/${movie.title}`}
            key={movie.id}
          >
            <div className={movieSectionStyle.movieCard}>
              <div className={movieSectionStyle.imageSection}>
                <img
                  src={`${base_url}/${poster_sizes[6]}/${movie.poster_path}`}
                  alt={movie.title}
                />
                <span className={movieSectionStyle.rating}>
                  {movie.vote_average}
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
