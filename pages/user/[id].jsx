import profilePic from "@/assets/pfp.webp";
import UserMovieCard from "@/components/UserMovieCard";
import userStyle from '@/styles/User.module.css';
import Image from "next/image";

const User = () => {
    return (
      <div className={userStyle.userPage}>
        <div className={userStyle.topPanel}>
          <div>
            <Image src={profilePic} alt="user" />
          </div>
          <h1>User</h1>
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