import navbarStyle from "../styles/Navbar.module.css";
import profilePic from "../assets/pfp.webp";
import userPfp from "../assets/userPFP.webp";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import { AuthFormContext } from "@/context/authFormContext";
import { userContext } from "@/context/userContext";

const Navbar = () => {
  const { user, setUser } = useContext(userContext);
  const { setFormState } = useContext(AuthFormContext);

  const handleLoginBtn = () => {
    setFormState(true);
  };

  const handleLogoutBtn = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/logout");
      const data = await response.json();
      console.log(data);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className={navbarStyle.navbar}>
      <Link href="/" className={navbarStyle.pfpContainer}>
        <Image src={profilePic} alt="profile Pic" />
      </Link>
      <SearchBar />
      {user === null ? (
        <button className={navbarStyle.authButton} onClick={handleLoginBtn}>
          Login
        </button>
      ) : (
        <div className={navbarStyle.right}>
          <div className={user.images}>
            <div className={navbarStyle.userPfp}>
              <Image src={userPfp} alt="user profile pic" />
            </div>
          </div>
          <button className={navbarStyle.authButton} onClick={handleLogoutBtn}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
