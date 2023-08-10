import homeMovieStyle from "@/styles/HomeMovieSect.module.css";
import { useRef } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import MovieCard from "./MovieCard";
import PeopleCard from "./PeopleCards";





const HomePageMovieSect = ({ data,type }) => {
  const scrollRef = useRef(null);
  const { images, result } = data;

  const handleLeftScroll = () => {
    scrollRef.current.scrollLeft -= 400;
  };

  const handleRightScroll = () => {
    scrollRef.current.scrollLeft += 400;
  };

  return (
    <div className={homeMovieStyle.homeSection}>
      <AiFillCaretLeft
        onClick={handleLeftScroll}
        className={`${homeMovieStyle.icon} ${homeMovieStyle.left}`}
      />
      <div className={homeMovieStyle.inner} ref={scrollRef}>
       {type === 'movies' ?  result.map((movie) => (
          <MovieCard data={{ movie, images }} key={movie.id} />
       )) : result.map((people) => <PeopleCard data={{ people, images }} key={people.id}/>)}
      </div>
      <AiFillCaretRight
        onClick={handleRightScroll}
        className={`${homeMovieStyle.icon} ${homeMovieStyle.right}`}
      />
    </div>
  );
};

export default HomePageMovieSect;
