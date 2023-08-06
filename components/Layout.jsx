import { useState } from "react";
import Auth from "./Auth";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [formState,setFormState] = useState(false)
  return (
    <div>
      <Navbar data={{ formState, setFormState }} />
      <Auth data={{formState,setFormState}}/>
      {children}
    </div>
  );
};

export default Layout;
