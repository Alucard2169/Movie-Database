import Banner from "@/components/Banner";
import MovieSection from "@/components/MovieSection";
import homeStyle from "../styles/Home.module.css";

export default function Home({ images, result }) {
  return (
    <div className={homeStyle.home}>
      <Banner />
      {/* send movies result as a prop to the MovieSection component */}
      <h2 className={homeStyle.heading}>Popular Now In Movies</h2>
      <MovieSection data={{ images, result }} />
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
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );
  const movieData = await movieResponse.json();

  // remove last 3 movie objects from the results array (personal choice)
  movieData.results.splice(-4);

  // store the remaining array in result variable
  const result = movieData.results;

  return {
    props: { images, result },
  };
};
