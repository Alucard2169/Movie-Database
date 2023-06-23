import Credits from "@/components/Credits";
import peopleStyle from "@/styles/People.module.css";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { getImageDetails } from "@/libs/cacheImage";

const PeoplePage = ({ images, peopleData, creditData }) => {
  //   const router = useRouter();
  const [showFullBio, setShowFullBio] = useState(false);
  //   const { id } = router.query;
  console.log(images);
  const {
    name,
    biography,
    birthday,
    deathday,
    gender,
    id,
    imdb_id,
    known_for_department,
    profile_path,
  } = peopleData;

  const { base_url, profile_sizes } = images;

  const handleReadMore = () => {
    setShowFullBio(!showFullBio);
  };
  const truncatedBio = biography.split(" ").slice(0, 150).join(" ");

  return (
    <div className={peopleStyle.peoplePage} key={id || imdb_id}>
      <Head>
        <title>Movie Database | {name}</title>
      </Head>
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
      <div className={peopleStyle.movies}>
        <h2>Known For</h2>
        <Credits data={{ images, creditData, type: "person" }} />
      </div>
    </div>
  );
};

export default PeoplePage;

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  try {
    const images = await getImageDetails();

    // get people data
    const peopleResponse = await fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const peopleData = await peopleResponse.json();

    // get credits
    const creditResponse = await fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const creditData = await creditResponse.json();

    return {
      props: {
        images,
        peopleData,
        creditData,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {},
    };
  }
};
