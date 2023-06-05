const { createContext, useState, useEffect } = require("react");

export const userContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user);

  const initial = async () => {
    try {
      const response = await fetch(`${window.location.origin}/api/initial`);

      const data = await response.json();
      console.log(data);
      console.log(user);

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
