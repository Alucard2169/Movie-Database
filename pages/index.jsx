import Banner from "@/components/Banner";
import HomePageMovieSect from "@/components/HomepageMovieSect";
import Head from "next/head";
import Link from "next/link";
import { AiFillCaretRight } from "react-icons/ai";
import { getImageDetails } from "../libs/cacheImage";
import homeStyle from "../styles/Home.module.css";

export default function Home({ images, result, topRatedMoviesResult ,trendingPeopleResult}) {
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
        <HomePageMovieSect data={{ images, result }}  type="movies"/>
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
        <HomePageMovieSect data={{ images, result: topRatedMoviesResult }}  type="movies"/>
      </section>
      <hr />
      <section>
        <div className={homeStyle.top}>
          <h2 className={homeStyle.heading}>Trending People This Week</h2>
          <Link
            href={`/movie/theme/top_rated`}
            aria-label="all Top rated movies"
          >
            <AiFillCaretRight className={homeStyle.icon} />
          </Link>
        </div>
        <HomePageMovieSect data={{ images, result: trendingPeopleResult }} type="people" />
      </section>
    </div>
  );
}

export const getServerSideProps = async () => {
  const images = await getImageDetails();

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


  const trendingPeopleResponse = await fetch(
    `https://api.themoviedb.org/3/trending/person/week?api_key=${process.env.API_KEY}&page=1`
  );
  const trendingPeopleData = await trendingPeopleResponse.json()
  const trendingPeopleResult = trendingPeopleData.results;

  return {
    props: { images, result, topRatedMoviesResult,trendingPeopleResult},
  };
};
