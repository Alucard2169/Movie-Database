import Banner from "@/components/Banner";
import homeStyle from "../styles/Home.module.css";
import HomePageMovieSect from "@/components/HomepageMovieSect";

export default function Home({ images, result, topRatedMoviesResult }) {
  return (
    <div className={homeStyle.home}>
      <Banner />
      {/* send movies result as a prop to the MovieSection component */}
      <section>
        <h2 className={homeStyle.heading}>Popular Now In Movies</h2>
        <HomePageMovieSect data={{ images, result }} />
      </section>
      <hr />
      <section>
        <h2 className={homeStyle.heading}>Top Rated In Movies</h2>
        <HomePageMovieSect data={{ images, result: topRatedMoviesResult }} />
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

  // store the remaining array in result variable
  const result = movieData.results;

  // top rated movies
  const topRatedMovies = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=1`
  );
  const topRatedMoviesData = await topRatedMovies.json();

  const topRatedMoviesResult = topRatedMoviesData.results;

  return {
    props: { images, result, topRatedMoviesResult },
  };
};
