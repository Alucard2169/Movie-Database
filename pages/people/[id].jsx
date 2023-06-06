import Image from "next/image";
import { useRouter } from "next/router";

const PeoplePage = ({ images, peopleData }) => {
  //   const router = useRouter();

  //   const { id } = router.query;
  const {
    name,
    biography,
    also_known_as,
    birthday,
    deathday,
    gender,
    homepage,
    id,
    imdb_id,
    known_for_department,
    place_of_birth,
    profile_path,
  } = peopleData;

  const { base_url, profile_sizes } = images;

  return (
    <div key={id || imdb_id}>
      <section className="top">
        <div className="impInfo">
          <div className="imageSect">
            <Image
              src={`${base_url}/${profile_sizes[3]}/${profile_path}`}
              alt={`${name} image`}
              width={550}
              height={800}
            />
          </div>
          <article>
            <h1>
              {name} (<span>{known_for_department}</span>)
            </h1>
            <span>{gender === 1 ? "Female" : "Male"}</span>
            <p>D.O.B: {birthday}</p>
            {deathday && <p>D.O.D: {deathday}</p>}
          </article>
        </div>
        <article>
          <p className="about">{biography}</p>
        </article>
      </section>
    </div>
  );
};

export default PeoplePage;

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  try {
    // get image data
    const imageResponse = await fetch(
      `https://api.themoviedb.org/3/configuration?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const imageData = await imageResponse.json();

    const images = imageData.images;

    // get people data
    const peopleResponse = await fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const peopleData = await peopleResponse.json();

    return {
      props: {
        images,
        peopleData,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {},
    };
  }
};
