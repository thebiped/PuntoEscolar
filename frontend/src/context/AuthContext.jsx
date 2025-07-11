import { createContext, useState, useEffect } from "react";
import { getCurrentUser, logout as logoutService } from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [autenticado, setAutenticado] = useState(() => {
    return localStorage.getItem("auth") === "true";
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("auth", "true");
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setAutenticado(true);
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
    setAutenticado(false);
  };

  return (
    <AuthContext.Provider value={{ autenticado, login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};