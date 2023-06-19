import { useEffect, useRef, useState } from "react";
import MovieSection from "@/components/MovieSection";
import nameStyle from "../../../styles/Name.module.css";

const MovieByName = ({ images, initialResult, error }) => {
  const [result, setResult] = useState(initialResult);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef(null);
  const lastMovieRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        loadMoreData();
      }
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    if (lastMovieRef.current) {
      observer.current.observe(lastMovieRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading]);

  const loadMoreData = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${theme}?api_key=${process.env.API_KEY}&page=${nextPage}`
      );
      const newData = await response.json();
      const newResult = newData.results;
      setResult((prevResult) => [...prevResult, ...newResult]);
      setPage(nextPage);
      setLoading(false);
    } catch (error) {
      console.error("Error loading more data:", error);
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className={nameStyle.page}>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className={nameStyle.page}>
      <MovieSection data={{ images, result }} showDeleteButton={false} />
      {loading && <p>Loading more movies...</p>}
      <div ref={lastMovieRef} />
    </div>
  );
};

export default MovieByName;

export const getServerSideProps = async (context) => {
  const { theme } = context.query;

  const imageResponse = await fetch(
    `https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`
  );
  const imageData = await imageResponse.json();

  const images = imageData.images;

  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${theme}?api_key=${process.env.API_KEY}&page=1`
  );
  const movieData = await movieResponse.json();

  const initialResult = movieData.results;

  return {
    props: { images, initialResult },
  };
};
