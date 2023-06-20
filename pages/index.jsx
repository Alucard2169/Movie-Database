import Banner from "@/components/Banner";
import homeStyle from "../styles/Home.module.css";
import { AiFillCaretRight } from "react-icons/ai";
import HomePageMovieSect from "@/components/HomepageMovieSect";
import Link from "next/link";
import Head from "next/head";

export default function Home({ images, result, topRatedMoviesResult }) {
  return (
    <div className={homeStyle.home}>
      <Head>
        <title>Movie Database | Home</title>
      </Head>
      <Banner />
      <section>
        <div className={homeStyle.top}>
          <h2 className={homeStyle.heading}>Popular Now In Movies</h2>
          <Link href={`/movie/theme/popular`} aria-label="all Popular movies">
            <AiFillCaretRight className={homeStyle.icon} />
          </Link>
        </div>
        <HomePageMovieSect data={{ images, result }} />
      </section>
      <hr />
      <section>
        <div className={homeStyle.top}>
          <h2 className={homeStyle.heading}>Top Rated In Movies</h2>
          <Link
            href={`/movie/theme/top_rated`}
            aria-label="all Top rated movies"
          >
            <AiFillCaretRight className={homeStyle.icon} />
          </Link>
        </div>
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
