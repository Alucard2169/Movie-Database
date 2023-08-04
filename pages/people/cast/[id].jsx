import casteStyle from "@/styles/Cast.module.css";
import Credits from "@/components/Credits";
import { getImageDetails } from "@/libs/cacheImage";

const FullCast = ({ images, cast, crew }) => {
  return (
    <div className={casteStyle.castPage}>
      <Credits data={{ images, creditData: { cast, crew }, type: "cast" }} />
    </div>
  );
};

export default FullCast;

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const images = await getImageDetails();

  // get people
  const peopleResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );

  const peopleData = await peopleResponse.json();
  const cast = peopleData.cast;
  const crew = peopleData.crew;

  return {
    props: {
      images,
      cast,
      crew,
    },
  };
};
