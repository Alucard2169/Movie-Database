const { createContext, useState, useEffect } = require("react");
const { useRouter } = require("next/router");

export const userContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const initial = async () => {
    try {
      const response = await fetch(`${window.location.origin}/api/initial`);
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

    useEffect(() => {
      // Trigger initial function when the website loads
      initial();
    }, []);


  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
