import profilePic from '@/assets/userPFP.webp';
import UserMovieCard from '@/components/UserMovieCard';
import { getImageDetails } from "@/libs/cacheImage";
import userStyle from "@/styles/User.module.css";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
const User = ({ images }) => {
 
  const supabase = useSupabaseClient();
  const user = useUser();
  const [movieList, setMovieList] = useState(null);

  const getMovieIdFromDB = async () => {
    try {
      const { data, error } = await supabase.from("Movies").select("movie_id");
      if (error) {
        throw Error(error.message);
      }
      return data;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  const fetchMovies = useCallback(async () => {
    try {
      const data = await getMovieIdFromDB();

      if (data.length > 0) {
        const moviePromises = data.map(async (movie) => {
          try {
            const movieResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.movie_id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
            );
            const movieData = await movieResponse.json();
            return movieData; // Return the movie data

          } catch (error) {
            console.log(error.message);
            return null;
          }
        });

        const movieResults = await Promise.all(moviePromises); // Use Promise.all to wait for all promises
        const movies = movieResults.filter((movie) => movie !== null); // Filter out null values
 
        setMovieList(movies)

      } else {
        console.log("No movies found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [supabase]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleRemoveMovie = (imdb_id) => {
    setMovieList((prevMovieList) =>
      prevMovieList.filter((movie) => movie.imdb_id !== imdb_id)
    );
  };

  return (
    <div className={userStyle.userPage}>
      {user && (
        <div className={userStyle.topPanel}>
          <div className={userStyle.imageContainer}>
            <Image src={profilePic} alt="user" />
          </div>
          <div className={userStyle.info}>
            <h1>{user.user_metadata.username}</h1>
            <h3>{user.email}</h3>
          </div>
        </div>
      )}
      <div className={userStyle.listSection}>
        <section>
          <h2>Movies</h2>
          {movieList && (
            <div className={userStyle.movieList}>
              {movieList.map((movie) => (
              
                  <UserMovieCard
                    data={{ movie, images }}
                    onRemove={handleRemoveMovie}
                    key={movie.id}
                  />
            
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default User;

export const getServerSideProps = async () => {
  const images = await getImageDetails();
 
  return {
    props: {
      images
    }
  }
}
