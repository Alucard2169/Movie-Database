const { createContext, useState } = require("react");

export const AuthFormContext = createContext(null);

export const AuthFormContextProvider = ({ children }) => {
  const [formState, setFormState] = useState(false);
  return (
    <AuthFormContext.Provider value={{ formState, setFormState }}>
      {children}
    </AuthFormContext.Provider>
  );
};
