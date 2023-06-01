import { useContext } from "react";
import Link from "next/link";
import { userContext } from "@/context/userContext";
import userMenuStyle from "@/styles/UserMenu.module.css";

const UserMenu = ({ state, logoutFnc }) => {
  const { user } = useContext(userContext);
  console.log(user);
  return (
    <div
      className={`${userMenuStyle.menu}  ${state ? userMenuStyle.show : null}`}
    >
      <Link href={`user/${user.id}`}>
        <button>Profile</button>
      </Link>
      <button onClick={logoutFnc}>Logout</button>
    </div>
  );
};

export default UserMenu;
