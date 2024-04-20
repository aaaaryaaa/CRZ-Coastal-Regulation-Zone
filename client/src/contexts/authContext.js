import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [loggedIn, setLogin] = useState(null);
  const [officeLogin, setOfficeLogin] = useState(null);
  return (
    <AuthContext.Provider
      value={{ loggedIn, setLogin, officeLogin, setOfficeLogin }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
