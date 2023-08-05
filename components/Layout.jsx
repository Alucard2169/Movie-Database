import { useState } from "react";
import Auth from "./Auth";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [authFormState,setAuthFormState] = useState(false)
  return (
    <div>
      <Navbar data={{ authFormState, setAuthFormState }} />
      <Auth data={{ authFormState, setAuthFormState }} />
      {children}
    </div>
  );
};

export default Layout;
