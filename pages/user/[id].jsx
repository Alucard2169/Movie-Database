import userStyle from "@/styles/User.module.css";
import { userContext } from "@/context/userContext";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import userPfp from "@/assets/userPFP.webp";
import MovieSection from "@/components/MovieSection";

const Profile = ({ images }) => {
  const { user } = useContext(userContext);
  const [choice, setChoice] = useState("favorite");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [listMovies, setListMovies] = useState([]);

  const handleMovieDeleted = (deletedMovieId) => {
    setFavoriteMovies((prevResults) =>
      prevResults.filter((movie) => movie._id !== deletedMovieId)
    );
    setListMovies((prevResults) =>
      prevResults.filter((movie) => movie._id !== deletedMovieId)
    );
  };

  const filterMovies = (data) => {
    const favorite = data.filter((movie) => movie.type === "favorite");
    setFavoriteMovies(favorite);
    const list = data.filter((movie) => movie.type === "list");
    setListMovies(list);
  };

  useEffect(() => {
    const fetchMovies = async (user) => {
      if (user) {
        const response = await fetch(
          `http://localhost:3000/api/getMovie?id=${user.id}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          let movies = await Promise.all(
            data.map(async (code) => {
              const movieResponse = await fetch(
                `https://api.themoviedb.org/3/find/${code.movieId}?external_source=imdb_id&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
              );
              const movieData = await movieResponse.json();

              if (
                movieData &&
                movieData.movie_results &&
                movieData.movie_results.length > 0
              ) {
                const movieResult = movieData.movie_results[0];
                const result = { ...movieResult, ...code };
                return result;
              }
            })
          );

          filterMovies(movies);
        } else {
          console.log("no movies");
        }
      }
    };

    fetchMovies(user);
  }, [user]);

  return (
    <div className={userStyle.userPage}>
      <div className={userStyle.userDetails}>
        <Image src={userPfp} alt="user profile pic" />
        <div className={userStyle.info}>
          {user ? (
            <>
              <h2 className="username">{user.username}</h2>
              <h4>{user.email}</h4>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>

        <div className={userStyle.total}>
          <p>
            Favorite : <span>{favoriteMovies.length}</span>
          </p>
          <p>
            List : <span>{listMovies.length}</span>
          </p>
        </div>
      </div>
      <div className={userStyle.list}>
        <div className={userStyle.top}>
          <button
            onClick={() => setChoice("favorite")}
            className={choice === "favorite" ? userStyle.active : null}
          >
            Favorite
          </button>
          <button
            onClick={() => setChoice("list")}
            className={choice === "list" ? userStyle.active : null}
          >
            My List
          </button>
        </div>
        <div className="favorite">
          <MovieSection
            data={{
              images,
              result: choice === "favorite" ? favoriteMovies : listMovies,
            }}
            showDeleteButton={true}
            onMovieDeleted={{ handleMovieDeleted }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps = async (context) => {
  try {
    const imageResponse = await fetch(
      `https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`
    );
    const imageData = await imageResponse.json();

    const images = imageData.images;

    return {
      props: {
        images,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {},
    };
  }
};
