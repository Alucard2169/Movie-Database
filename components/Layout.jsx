import Navbar from "./Navbar";
import Auth from "./Auth";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Auth />
      {children}
    </div>
  );
};

export default Layout;
