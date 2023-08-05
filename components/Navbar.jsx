import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import profilePic from "../assets/pfp.webp";
import navbarStyle from "../styles/Navbar.module.css";
import SearchBar from "./SearchBar";

const Navbar = ( ) => {
  

  const router = useRouter();

  const [displayState, setDisplayState] = useState(false);





  return (
    <nav className={navbarStyle.navbar}>
      <Link href="/" className={navbarStyle.pfpContainer}>
        <Image src={profilePic} alt="profile Pic" />
      </Link>
      <SearchBar />
    
    </nav>
  );
};

export default Navbar;
