import Banner from "@/components/Banner";
import MovieSection from "@/components/MovieSection";

export default function Home({ images, result }) {
  return (
    <div>
      <Banner />

      {/* send movies result as a prop to the MovieSection component */}
      <MovieSection data={{ images, result }} />
    </div>
  );
}

export async function getServerSideProps() {
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
}
