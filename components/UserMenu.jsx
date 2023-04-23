import userMenuStyle from "@/styles/UserMenu.module.css";

const UserMenu = ({ state, logoutFnc }) => {
  return (
    <div
      className={`${userMenuStyle.menu}  ${state ? userMenuStyle.show : null}`}
    >
      <button>Profile</button>
      <button onClick={logoutFnc}>Logout</button>
    </div>
  );
};

export default UserMenu;
