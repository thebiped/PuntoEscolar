import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome/Welcome";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import DashboardInicio from "./pages/dashboard/inicio/DashboardInicio";
import Catalogo from "./pages/dashboard/catalogo/Catalogo";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Carrito from "./pages/dashboard/carrito/Carrito";
import Pedidos from "./pages/dashboard/pedidos/Pedidos";
import Account from "./pages/dashboard/account/Account";
import AdminPanel from "./pages/dashboard/admin/AdminPanel";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route
            path="/admin-panel"
            element={
              <PrivateRoute requiredRole="admin">
                {" "}
                <AdminPanel />
              </PrivateRoute>
            }
          />

          {/* Rutas privadas */}
          <Route
            path="/inicio"
            element={
              <PrivateRoute>
                <DashboardInicio />
              </PrivateRoute>
            }
          />
          <Route
            path="/catalogo"
            element={
              <PrivateRoute>
                <Catalogo />
              </PrivateRoute>
            }
          />
          <Route
            path="/carrito"
            element={
              <PrivateRoute>
                <Carrito />
              </PrivateRoute>
            }
          />
          <Route
            path="/pedidos"
            element={
              <PrivateRoute>
                <Pedidos />
              </PrivateRoute>
            }
          />

          <Route
            path="/cuenta"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
