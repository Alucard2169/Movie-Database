import Banner from "@/components/Banner";
import MovieSection from "@/components/MovieSection";
import homeStyle from "../styles/Home.module.css";

export default function Home({ images, result, topRatedMoviesResult }) {
  return (
    <div className={homeStyle.home}>
      <Banner />
      {/* send movies result as a prop to the MovieSection component */}
      <section>
        <h2 className={homeStyle.heading}>Popular Now In Movies</h2>
        <MovieSection data={{ images, result }} showDeleteButton={false} />
      </section>
      <hr />
      <section>
        <h2 className={homeStyle.heading}>Top Rated In Movies</h2>
        <MovieSection
          data={{ images, result: topRatedMoviesResult }}
          showDeleteButton={false}
        />
      </section>
    </div>
  );
}

export const getServerSideProps = async () => {
  const imageResponse = await fetch(
    `https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`
  );
  const imageData = await imageResponse.json();

  const images = imageData.images;

  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=1`
  );
  const movieData = await movieResponse.json();

  // remove last 3 movie objects from the results array (personal choice)
  movieData.results.splice(-4);

  // store the remaining array in result variable
  const result = movieData.results;

  // top rated movies
  const topRatedMovies = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=1`
  );
  const topRatedMoviesData = await topRatedMovies.json();
  topRatedMoviesData.results.splice(-4);
  const topRatedMoviesResult = topRatedMoviesData.results;

  return {
    props: { images, result, topRatedMoviesResult },
  };
};
