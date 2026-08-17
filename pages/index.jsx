import Banner from "@/components/Banner";
import HomePageMovieSect from "@/components/HomepageMovieSect";
import Head from "next/head";
import Link from "next/link";
import { AiFillCaretRight } from "react-icons/ai";
import { getImageDetails } from "../libs/cacheImage";
import { fetchWithRetry } from "../libs/fetchWithRetry";
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

export const getStaticProps = async () => {
  const images = await getImageDetails();

  const [popularData, topRatedData, trendingData] = await Promise.all([
    fetchWithRetry(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=1`),
    fetchWithRetry(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=1`),
    fetchWithRetry(`https://api.themoviedb.org/3/trending/person/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=1`),
  ]);

  return {
    props: {
      images,
      result: popularData?.results ?? [],
      topRatedMoviesResult: topRatedData?.results ?? [],
      trendingPeopleResult: trendingData?.results ?? [],
    },
    revalidate: 3600,
  };
};
