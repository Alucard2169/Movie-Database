import casteStyle from "@/styles/Cast.module.css";
import Credits from "@/components/Credits";
import { getImageDetails } from "@/libs/cacheImage";
import { fetchWithRetry } from "@/libs/fetchWithRetry";

const FullCast = ({ images, cast, crew }) => {
  return (
    <div className={casteStyle.castPage}>
      <Credits data={{ images, creditData: { cast, crew }, type: "cast" }} />
    </div>
  );
};

export default FullCast;

export const getStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const images = await getImageDetails();

  const peopleData = await fetchWithRetry(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );

  return {
    props: {
      images,
      cast: peopleData?.cast ?? [],
      crew: peopleData?.crew ?? [],
    },
    revalidate: 86400,
  };
};
