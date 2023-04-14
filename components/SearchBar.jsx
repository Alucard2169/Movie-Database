import searchBarStyle from "../styles/SearchBar.module.css";
import { Roboto_Flex } from "@next/font/google";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const roboto_flex = Roboto_Flex({
  subsets: ["latin"],
  weight: ["300", "500", "700", "800"],
});

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
          className={roboto_flex.className}
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
