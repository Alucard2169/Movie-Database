import searchBarStyle from "../styles/SearchBar.module.css";

import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const SearchBar = () => {
  const [movie, setMovie] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movie);
    setMovie("");
  };

  return (
    <form className={searchBarStyle.searchBar} onSubmit={handleSubmit}>
      <label htmlFor="search">
        <AiOutlineSearch className={searchBarStyle.icon} />
        <input
          type="text"
          id="search"
          name="search"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
        />
      </label>
    </form>
  );
};

export default SearchBar;
