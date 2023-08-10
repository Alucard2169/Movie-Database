import MovieSection from "@/components/MovieSection";
import { getImageDetails } from "@/libs/cacheImage";
import themeStyle from "@/styles/Theme.module.css";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import nameStyle from "../../../styles/Name.module.css";

const MovieByName = ({ images, initialResult, error, theme }) => {
  const [result, setResult] = useState(initialResult);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const lastMovieRef = useRef(null);

  const fetchMovies = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${theme}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
      );
      const data = await response.json();
      const result = data.results;
      setResult((prevResult) => [...prevResult, ...result]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [theme, page]); // Include theme and page in the dependency array

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + Math.ceil(window.scrollY) >=
        document.body.offsetHeight
      ) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
        fetchMovies();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchMovies]); // Include fetchMovies in the dependency array

  if (error) {
    return (
      <div className={nameStyle.page}>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className={nameStyle.page}>
      <Head>
        <title>Movie Database | {theme}</title>
      </Head>
      <MovieSection data={{ images, result }} showDeleteButton={false} />
      {loading && (
        <div className={themeStyle.center}>
          <div className={themeStyle.wave}></div>
          <div className={themeStyle.wave}></div>
          <div className={themeStyle.wave}></div>
          <div className={themeStyle.wave}></div>
          <div className={themeStyle.wave}></div>
          <div className={themeStyle.wave}></div>
          <div className={themeStyle.wave}></div>
          <div className={themeStyle.wave}></div>
          <div className={themeStyle.wave}></div>
          <div className={themeStyle.wave}></div>
        </div>
      )}
      <div ref={lastMovieRef} />
    </div>
  );
};

export default MovieByName;

export const getServerSideProps = async (context) => {
  const { theme } = context.query;

  try {
    const images = await getImageDetails();

    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${theme}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=1`
    );
    const movieData = await movieResponse.json();

    const initialResult = movieData.results;

    return {
      props: { images, initialResult, theme },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { error: "Failed to fetch data" },
    };
  }
};
