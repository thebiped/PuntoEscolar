import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [autenticado, setAutenticado] = useState(() => {
    return localStorage.getItem("auth") === "true";
  });

  const login = () => {
    localStorage.setItem("auth", "true");
    setAutenticado(true);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAutenticado(false);
  };

  return (
    <AuthContext.Provider value={{ autenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};