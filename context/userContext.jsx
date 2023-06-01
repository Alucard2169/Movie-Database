const { createContext, useState, useEffect } = require("react");

export const userContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user);
  useEffect(() => {
    const initial = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/initial");
        const data = await response.json();

        if (data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
      }
    };

    initial();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
