import Reviews from "@/components/Reviews";
import TrailerBox from "@/components/TrailerBox";
import { getImageDetails } from "@/libs/cacheImage";
import { fetchWithRetry } from "@/libs/fetchWithRetry";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiFillCaretRight,
  AiFillHeart,
  AiFillPlayCircle,
  AiOutlineGlobal,
} from "react-icons/ai";

import singlePageDesign from "../../styles/SinglePage.module.css";
import LazyBanner from "@/components/LazyBanner";


const SingleMoviePage = ({ data, images, castResult, crew, trailerData, reviewsData }) => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [inList, setInList] = useState(false);
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

  const getMovies = async (id) => {
    try {
      // Check if the movie already exists
      const { data: movies, error } = await supabase
        .from("Movies")
        .select("movie_id")
        .eq("movie_id", id);

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      if (movies.length > 0) {
        if (movies.some((obj) => Object.values(obj).includes(id))) {
          setInList(true);
        } else {
          setInList(false);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getMovies(imdb_id);
  }, [imdb_id]);


  const handleMovieAdd = async () => {
    try {
      const movieData = { movie_id: imdb_id};

      if (!inList) {
        const { data, error } = await supabase
          .from("Movies")
          .insert([movieData]);

        setInList(true)

          if (error) {
            console.error("Error inserting movie:", error);
            return null;
          }
      }

      else {

        const { error } = await supabase
          .from("Movies")
          .delete()
          .eq("movie_id", imdb_id);
        setInList(false)
        if (error) {
          console.log('error',error.message)
        }

      }
    
    } catch (error) {
      console.log("An error occurred:", error.message);
    }
  };

  const base_url = images?.base_url ?? '';
  const backdrop_sizes = images?.backdrop_sizes ?? ['', '', '', '/original'];
  const profile_sizes = images?.profile_sizes ?? ['', '/w185'];

  return (
    <div className={singlePageDesign.singlePage}>
      <Head>
        <title>{`Movie Database | ${title}`}</title>
      </Head>
      {!backdrop_path && (
        <div className={singlePageDesign.notAvailable}>
          <p>Image Not Available</p>
        </div>
      )}
      {backdrop_path && (
        <div className={singlePageDesign.moviePoster}>
          <LazyBanner
            data={{
              src: `${base_url}${backdrop_sizes[3]}${backdrop_path}`,
              alt: title,
              width: 3800,
              height: 2200,
            }}
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

              <aside>
                {user && (
                  <>
                    <AiFillHeart
                      className={`${singlePageDesign.icons} ${
                        inList ? singlePageDesign.added : null
                      }`}
                      onClick={handleMovieAdd}
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
          {reviewsData.length > 0 && (
            <section className={singlePageDesign.reviews}>
              <h2>Reviews</h2>
              <div className={singlePageDesign.reviewContainer}>
                {reviewsData.map((review, i) => (
                  <Reviews data={{ review, images }} key={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleMoviePage;

export const getStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;

  const images = await getImageDetails();

  const [peopleData, data, trailerD, reviewsD] = await Promise.all([
    fetchWithRetry(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`),
    fetchWithRetry(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`),
    fetchWithRetry(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`),
    fetchWithRetry(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.NEXT_PUBLIC_API_KEY}`),
  ]);

  if (!data || !data.id) {
    return { notFound: true };
  }

  const cast = peopleData?.cast ?? [];
  const castResult = cast.splice(0, 5);
  // Only pass directors — the full crew array bloats page data past 128kB
  const crew = (peopleData?.crew ?? []).filter((p) => p.job === "Director");
  const trailerData = (trailerD?.results ?? []).filter((v) => v.type === "Trailer").slice(0, 3);
  // Limit reviews to 10 and trim content length to keep page data lean
  const reviewsData = (reviewsD?.results ?? []).slice(0, 10).map((r) => ({
    ...r,
    content: r.content?.length > 2000 ? r.content.slice(0, 2000) + '...' : r.content,
  }));

  return {
    props: { data, images, castResult, crew, trailerData, id, reviewsData },
    revalidate: 86400,
  };
};
