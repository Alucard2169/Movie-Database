import navbarStyle from "../styles/Navbar.module.css";
import profilePic from "../assets/pfp.webp";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className={navbarStyle.navbar}>
      <Link href="/" className={navbarStyle.pfpContainer}>
        <Image src={profilePic} alt="profile Pic" />
      </Link>
      <SearchBar />
      <button className={navbarStyle.authButton}>Login</button>
    </nav>
  );
};

export default Navbar;
