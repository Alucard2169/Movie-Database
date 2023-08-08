import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import Link from "next/link";
import profilePic from "../assets/pfp.webp";
import navbarStyle from "../styles/Navbar.module.css";
import SearchBar from "./SearchBar";

const Navbar = ({data}) => {
  
  const user = useUser();
  console.log(user)

  const { setFormState } = data;

  const supabase = useSupabaseClient()
  const handleLogout = async () => {
    try {
      const { error } = supabase.auth.signOut()
      if (error) {
        throw Error(error.message)
      }

    }
    catch (err) {
      console.log(err.message)
    }
  }
  
  return (
    <nav className={navbarStyle.navbar}>
      <Link href="/" className={navbarStyle.pfpContainer}>
        <Image src={profilePic} alt="profile Pic" />
      </Link>
      <SearchBar />
      {user ? <button className={navbarStyle.authButton} onClick={handleLogout}>Logout</button>: (
        <button
          className={navbarStyle.authButton}
          onClick={() => setFormState(true)}
        >
          Sign Up
        </button>
      )}
      
    </nav>
  );
};

export default Navbar;
