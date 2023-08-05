import { userContext } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import profilePic from "../assets/pfp.webp";
import userPfp from "../assets/userPFP.webp";
import navbarStyle from "../styles/Navbar.module.css";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

const Navbar = ({ data }) => {
  
  const { authFormState, setAuthFormState } = data;
  const router = useRouter();
  const { user, setUser } = useContext(userContext);
  const [displayState, setDisplayState] = useState(false);

  const handleSignUpBtn = () => {
setAuthFormState(true)
  };

  const handleUserMenu = () => {
    setDisplayState(displayState ? false : true);
  };

  const handleLogoutBtn = async () => {
    try {
      const response = await fetch(`${window.location.origin}/api/logout`);
      const data = await response.json();
      if (response.ok) {
        setUser(null);
        router.push("/");
      }
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
        <button className={navbarStyle.authButton} onClick={handleSignUpBtn}>
          SignUp
        </button>
      ) : (
        <div className={navbarStyle.right}>
          <div className={user.images}>
            <div className={navbarStyle.userPfp} onClick={handleUserMenu}>
              <Image src={userPfp} alt="user profile pic" />
            </div>
          </div>
          <button className={navbarStyle.authButton} onClick={handleLogoutBtn}>
            Logout
          </button>

          <UserMenu
            state={displayState}
            stateHandle={setDisplayState}
            logoutFnc={handleLogoutBtn}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
