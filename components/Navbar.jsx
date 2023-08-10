import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import profilePic from "../assets/pfp.webp";
import userPFP from '../assets/userPFP.webp';
import navbarStyle from "../styles/Navbar.module.css";
import SearchBar from "./SearchBar";

const Navbar = ({data}) => {
  const router = useRouter()
  const user = useUser();


  const { setFormState } = data;

  const supabase = useSupabaseClient()
  const handleLogout = async () => {
    try {
      const { error } = supabase.auth.signOut()
      if (error) {
        throw Error(error.message)
      }
      router.replace('/')
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
      {user ? (
        <div className={navbarStyle.right}>
          <div className={navbarStyle.userPfp}>
            <Link href={`/user/${user.id}`}>
              <Image
                src={userPFP}
                width={100}
                height={100}
                alt={user.user_metadata.username}
              />
            </Link>
          </div>
          <button className={navbarStyle.authButton} onClick={handleLogout}>
            Logout
          </button>{" "}
        </div>
      ) : (
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
