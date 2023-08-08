import profilePic from "@/assets/userPFP.webp";
import UserMovieCard from "@/components/UserMovieCard";
import userStyle from '@/styles/User.module.css';
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";

const User = () => {
  const user = useUser()
    return (
      <div className={userStyle.userPage}>
        <div className={userStyle.topPanel}>
          <div className={userStyle.imageContainer}>
            <Image src={profilePic} alt="user" />
          </div>
          <div className={userStyle.info}>
            <h1>{user.user_metadata.username}</h1>
            <h3>{user.email}</h3>
          </div>
        </div>
        <div className={userStyle.listSection}>
          <section>
            <h2>Movies</h2>
            <div className={userStyle.movieList}>
              <UserMovieCard />
            </div>
          </section>
          <section>
            <h2>People</h2>
          </section>
        </div>
      </div>
    );
}
 
export default User;