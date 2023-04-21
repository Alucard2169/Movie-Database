import { useState } from "react";
import singlePageDesign from "../../styles/SinglePage.module.css";
import { AiOutlineGlobal } from "react-icons/ai";

const SingleMoviePage = ({ data, images, castResult, crew }) => {
  const {
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

  const { base_url, backdrop_sizes, profile_sizes } = images;

  return (
    <div className={singlePageDesign.singlePage}>
      {!backdrop_path && (
        <div className={singlePageDesign.notAvailable}>
          <p>Image Not Available</p>
        </div>
      )}
      {backdrop_path && (
        <div className={singlePageDesign.moviePoster}>
          <img
            src={`${base_url}${backdrop_sizes[3]}${backdrop_path}`}
            alt={title}
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
                      <span>{people.name}</span>
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
                  <li>
                    <img
                      src={`${base_url}${profile_sizes[1]}${people.profile_path}`}
                      alt={people.name}
                    />
                    <div className="profileLower">
                      <h5>{people.name}</h5>
                      <h6>{people.character}</h6>
                    </div>
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