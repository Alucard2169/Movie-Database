import { useState } from "react";
import Navbar from "./Navbar";
import Auth from "./SignUp";

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
