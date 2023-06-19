import MovieSection from "@/components/MovieSection";
import nameStyle from "../../../styles/Name.module.css";
import Head from "next/head";
const MovieByName = ({ images, result, error, name }) => {
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
        <title>Movie Database | {name}</title>
      </Head>
      <MovieSection data={{ images, result }} showDeleteButton={false} />
    </div>
  );
};

export default MovieByName;

export const getServerSideProps = async (context) => {
  const { name } = context.query;

  const imageResponse = await fetch(
    `https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`
  );
  const imageData = await imageResponse.json();

  const images = imageData.images;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${name}&page=1&include_adult=false&certification_country=IN&certification=PG`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie data");
    }

    const { results } = await response.json();

    if (!results.length) {
      return {
        props: {
          error: "Media not found, please try again",
        },
      };
    }

    return {
      props: {
        images,
        result: results,
        name,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }
};
