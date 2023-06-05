import searchBarStyle from "../styles/SearchBar.module.css";
import { useRouter } from "next/router";

import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const [movie, setMovie] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push(`/movie/name/${movie}`);
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
