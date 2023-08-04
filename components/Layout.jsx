import Auth from "./Auth";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Auth/>
      {children}
    </div>
  );
};

export default Layout;
