import { useContext, useEffect, useState } from "react";
import singlePageDesign from "../../styles/SinglePage.module.css";
import { AiOutlineGlobal, AiFillHeart } from "react-icons/ai";
import { BiListPlus } from "react-icons/bi";
import { userContext } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";

const SingleMoviePage = ({ data, images, castResult, crew }) => {
  const { user } = useContext(userContext);
  const [status, setStatus] = useState(null);
  const {
    imdb_id,
    backdrop_path,
    title,
    overview,
    homepage,
    genres,
    release_date,
    runtime,
    budget,
    tagline,
  } = data;

  console.log(castResult);

  const { base_url, backdrop_sizes, profile_sizes } = images;

  const handleAdd = async (type) => {
    const id = imdb_id;

    const response = await fetch(`${window.location.origin}/api/addList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, userId: user.id, type }),
    });

    if (response.ok) {
      setStatus("Movie Added");
    } else {
      const data = await response.json();
      setStatus(data.error);
    }
  };

  useEffect(() => {
    if (status) {
      setTimeout(() => {
        setStatus(null);
      }, 4000);
    }
  }, [status]);

  return (
    <div className={singlePageDesign.singlePage}>
      {!backdrop_path && (
        <div className={singlePageDesign.notAvailable}>
          <p>Image Not Available</p>
        </div>
      )}
      {backdrop_path && (
        <div className={singlePageDesign.moviePoster}>
          <Image
            src={`${base_url}${backdrop_sizes[3]}${backdrop_path}`}
            alt={title}
            width={3800}
            height={2200}
          />
        </div>
      )}
      <div className={singlePageDesign.movieDetails}>
        <div className={singlePageDesign.info}>
          <section className={singlePageDesign.top}>
            <section className={singlePageDesign.topDetails}>
              <div className={singlePageDesign.left}>
                <div className={singlePageDesign.directors}>
                  {crew.map((people) =>
                    people.job === "Director" ? (
                      <span key={people.id}>{people.name}</span>
                    ) : null
                  )}
                </div>
                <div className={singlePageDesign.name}>
                  <h1>{title}</h1>
                </div>
                <div className={singlePageDesign.geners}>
                  <ul>
                    {genres.map((gener) => (
                      <li key={gener.id}> {gener.name}</li>
                    ))}
                  </ul>
                </div>
                {tagline && (
                  <p className={singlePageDesign.tagline}>{tagline}</p>
                )}
              </div>
              <aside>
                {status && <p className={singlePageDesign.show}>{status}</p>}
                {user && (
                  <>
                    <AiFillHeart
                      className={singlePageDesign.icons}
                      onClick={() => handleAdd("favorite")}
                    />
                    <BiListPlus
                      className={singlePageDesign.icons}
                      onClick={() => handleAdd("list")}
                    />
                  </>
                )}
                {homepage && (
                  <a href={homepage} target="_blank">
                    <AiOutlineGlobal className={singlePageDesign.icons} />
                  </a>
                )}
              </aside>
            </section>

            <div className={singlePageDesign.coreDetails}>
              <div className="date">
                <span>RELEASE</span>
                <p>{release_date}</p>
              </div>
              <div className="buget">
                <span>BUGET</span>
                <p>
                  {budget
                    ? `${"$" + (budget / 1000000).toFixed(1) + "M"}`
                    : "N/A"}
                </p>
              </div>
              <div className="length">
                <span>LENGTH</span>
                <p>{runtime} min</p>
              </div>
            </div>
          </section>
          <section className={singlePageDesign.lower}>
            <article className={singlePageDesign.description}>
              <h3>Description</h3>
              <p>{overview}</p>
            </article>

            <article className={singlePageDesign.cast}>
              <h3>Notable Cast</h3>
              <ul>
                {castResult.map((people) => (
                  <li key={people.id}>
                    <Link href={`/people/${people.id}`}>
                      <Image
                        src={`${base_url}${profile_sizes[1]}${people.profile_path}`}
                        alt={people.name}
                        width={100}
                        height={100}
                      />
                      <div className="profileLower">
                        <h5>{people.name}</h5>
                        <h6>{people.character}</h6>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SingleMoviePage;

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const peopleResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`
  );

  const peopleData = await peopleResponse.json();
  const cast = peopleData.cast;
  const castResult = cast.splice(0, 5);
  const crew = peopleData.crew;

  const imageResponse = await fetch(
    `https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`
  );
  const imageData = await imageResponse.json();

  const images = imageData.images;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
  );
  const data = await response.json();

  return {
    props: {
      data,
      images,
      castResult,
      crew,
    },
  };
};
