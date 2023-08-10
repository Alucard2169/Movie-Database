import userMovieCard from "@/styles/UserMovieCard.module.css";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { AiFillDelete } from "react-icons/ai";

const UserMovieCard = ({ data,onRemove }) => {
  const supabase = useSupabaseClient();

  const { movie, images } = data;
  const { base_url, poster_sizes } = images;
  const { imdb_id, poster_path, title, vote_average } = movie; // Change 'id' to 'imdb_id'
  console.log(movie)

  const handleRemoveMovies = async (id) => {
    try {
    
      const { error } = await supabase
        .from("Movies")
        .delete()
        .eq("movie_id", id);

      if (error) {
        console.log(error);
      }
      onRemove(id)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={userMovieCard.card} key={imdb_id}>
      <div className={userMovieCard.imageContainer}>
        <Image
          width={300}
          height={1000}
          src={`${base_url}/${poster_sizes[6]}/${poster_path}`}
          alt={title}
        />
      </div>
      <div className={userMovieCard.movieInfo}>
        <h4>{title}</h4>
        <aside>
          <span>
            <AiFillDelete
              className={userMovieCard.icon}
              onClick={() => handleRemoveMovies(imdb_id)}
            />
          </span>
          <p>
            <span>{vote_average.toFixed(1)}</span>
          </p>
        </aside>
      </div>
    </div>
  );
};

export default UserMovieCard;
