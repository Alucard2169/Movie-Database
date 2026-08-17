import MovieSection from "@/components/MovieSection";
import nameStyle from "../../../styles/Name.module.css";
import Head from "next/head";
import { getImageDetails } from "@/libs/cacheImage";
import { fetchWithRetry } from "@/libs/fetchWithRetry";
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
        <title>{`Movie Database | ${name}`}</title>
      </Head>
      <MovieSection data={{ images, result }} showDeleteButton={false} />
    </div>
  );
};

export default MovieByName;

export const getServerSideProps = async (context) => {
  const { name } = context.query;
  const images = await getImageDetails();

  const data = await fetchWithRetry(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${name}&page=1&include_adult=false&certification_country=IN&certification=PG`
  );

  const results = data?.results ?? [];

  if (!results.length) {
    return { props: { error: "Media not found, please try again" } };
  }

  return { props: { images, result: results, name } };
};
