import casteStyle from "@/styles/Cast.module.css";
import Credits from "@/components/Credits";

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

  const imageResponse = await fetch(
    `https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`
  );
  const imageData = await imageResponse.json();

  const images = imageData.images;

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
