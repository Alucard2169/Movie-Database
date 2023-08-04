import { useContext } from "react";
import Link from "next/link";
import { userContext } from "@/context/userContext";
import userMenuStyle from "@/styles/UserMenu.module.css";

const UserMenu = ({ state, stateHandle, logoutFnc }) => {
  const { user } = useContext(userContext);

  const handleClick = () => {
    setTimeout(() => {
      stateHandle(false);
    }, 1000);
  };
  return (
    <div
      className={`${userMenuStyle.menu}  ${state ? userMenuStyle.show : null}`}
    >
      <Link href={`/user/${user.id}`} replace>
        <button onClick={handleClick}>Profile</button>
      </Link>
      <button onClick={logoutFnc}>Logout</button>
    </div>
  );
};

export default UserMenu;
