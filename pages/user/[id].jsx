import userStyle from "@/styles/User.module.css";
import { userContext } from "@/context/userContext";
import Image from "next/image";
import { useContext } from "react";
import userPfp from "@/assets/userPFP.webp";

const Profile = () => {
  const { user } = useContext(userContext);
  console.log(user);
  return (
    <div className={userStyle.userPage}>
      <div className={userStyle.userDetails}>
        <Image src={userPfp} alt="user profile pic" />
        <div className={userStyle.info}>
          <h2 className="username">{user.username}</h2>
          <h4>{user.email}</h4>
        </div>
      </div>
      <div className={userStyle.list}></div>
    </div>
  );
};

export default Profile;
