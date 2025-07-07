// src/components/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { autenticado } = useContext(AuthContext);
  return autenticado ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
