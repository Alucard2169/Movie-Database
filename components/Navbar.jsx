import navbarStyle from "../styles/Navbar.module.css";
import profilePic from "../assets/pfp.webp";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import { AuthFormContext } from "@/context/authFormContext";

const Navbar = () => {
  const { setFormState } = useContext(AuthFormContext);

  const handleLoginBtn = () => {
    setFormState(true);
  };
  return (
    <nav className={navbarStyle.navbar}>
      <Link href="/" className={navbarStyle.pfpContainer}>
        <Image src={profilePic} alt="profile Pic" />
      </Link>
      <SearchBar />
      <button className={navbarStyle.authButton} onClick={handleLoginBtn}>
        Login
      </button>
    </nav>
  );
};

export default Navbar;
