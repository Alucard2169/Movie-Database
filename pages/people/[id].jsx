import peopleStyle from "@/styles/People.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const PeoplePage = ({ images, peopleData }) => {
  //   const router = useRouter();
  const [showFullBio, setShowFullBio] = useState(false);
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

  const handleReadMore = () => {
    setShowFullBio(!showFullBio);
  };
  const truncatedBio = biography.split(" ").slice(0, 150).join(" ");

  return (
    <div className={peopleStyle.peoplePage} key={id || imdb_id}>
      <div className={peopleStyle.top}>
        <div className={peopleStyle.imageSect}>
          <Image
            src={`${base_url}/${profile_sizes[3]}/${profile_path}`}
            alt={`${name} image`}
            width={600}
            height={600}
          />
        </div>
        <section>
          <div>
            <h1>
              {name} (<span>{known_for_department}</span>)
            </h1>
            <span>{gender === 1 ? "Female" : "Male"}</span>
            <p>D.O.B: {birthday}</p>
            {deathday && <p className={peopleStyle.dod}>D.O.D: {deathday}</p>}
          </div>
          <p className={peopleStyle.about}>
            {showFullBio ? `${biography}` : `${truncatedBio}...`}
            <button
              onClick={handleReadMore}
              className={peopleStyle.readMoreBtn}
            >
              {showFullBio ? `Show Less` : `Read More`}
            </button>
          </p>
        </section>
      </div>
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
