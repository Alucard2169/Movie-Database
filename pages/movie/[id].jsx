import Reviews from "@/components/Reviews";
import TrailerBox from "@/components/TrailerBox";

import { getImageDetails } from "@/libs/cacheImage";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Suspense, lazy, useState } from "react";
import {
  AiFillCaretRight,
  AiFillPlayCircle
} from "react-icons/ai";
import singlePageDesign from "../../styles/SinglePage.module.css";

const LazyBanner = lazy(()=>import('@/components/LazyBanner'))

const SingleMoviePage = ({ data, images, castResult, crew, trailerData,reviewsData }) => {
 
  const [trailerVisibility, setTailerVisibility] = useState(false);
  const {
    id,
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

  let trailer = trailerData.filter((a) => a.type === "Trailer");
  if (trailer.length === 0) {
    trailer = trailerData.filter((a) => a.type === "Teaser");
  }

  const handleTrailerVisibility = () => {
    setTailerVisibility((prevData) => !prevData);
  };



  const { base_url, backdrop_sizes, profile_sizes } = images;


  return (
    <div className={singlePageDesign.singlePage}>
      <Head>
        <title>Movie Database | {title}</title>
      </Head>
      {!backdrop_path && (
        <div className={singlePageDesign.notAvailable}>
          <p>Image Not Available</p>
        </div>
      )}
      {backdrop_path && (
        <div className={singlePageDesign.moviePoster}>
          <Suspense
            fallback={
              <div>
                <p>Loading...</p>
              </div>
            }
          >
            <LazyBanner
              data={{
                src: `${base_url}${backdrop_sizes[3]}${backdrop_path}`,
                alt: title,
                width: 3800,
                height: 2200,
              }}
            />
          </Suspense>
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
              {trailer.length > 0 ? (
                <div className={singlePageDesign.trailer}>
                  <span>
                    <AiFillPlayCircle
                      onClick={handleTrailerVisibility}
                      className={singlePageDesign.trailerIcon}
                    />
                    Play Trailer
                  </span>
                  {trailerVisibility ? (
                    <TrailerBox
                      data={trailer}
                      handleMethod={handleTrailerVisibility}
                    />
                  ) : null}
                </div>
              ) : null}
              {/* <aside>
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
              </aside> */}
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
              <h3>
                View Full Cast{" "}
                <Link href={`/people/cast/${id}`}>
                  <AiFillCaretRight className={singlePageDesign.icon} />
                </Link>
              </h3>
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
          <section className={singlePageDesign.reviews}>
            <h2>Reviews</h2>
            <div className={singlePageDesign.reviewContainer}>
              {reviewsData.map((review,i) => (
                <Reviews data={{ review, images }} key={i} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SingleMoviePage;

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  // get people
  const peopleResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );

  const peopleData = await peopleResponse.json();
  const cast = peopleData.cast;
  const castResult = cast.splice(0, 5);
  const crew = peopleData.crew;

  const images = await getImageDetails();

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );
  const data = await response.json();

  // get the trailer
  const trailerResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const trailerD = await trailerResponse.json();
  const trailerData = trailerD.results;



  //get reviews
  const reviewsResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
  const reviewsD = await reviewsResponse.json();
  const reviewsData = reviewsD.results;

  return {
    props: {
      data,
      images,
      castResult,
      crew,
      trailerData,
      id,
      reviewsData,
    },
  };
};
