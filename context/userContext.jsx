const { createContext, useState, useEffect } = require("react");

export const userContext = createContext(null);

export const UserContextProvider = ({ children }) => {
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
    initial();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
