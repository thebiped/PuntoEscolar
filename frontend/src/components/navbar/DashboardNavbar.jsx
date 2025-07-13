import { useNavigate, Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import {
  ShoppingCart,
  User,
  Package,
  House,
  Hamburger,
  Plus,
  List,
} from "lucide-react";
import { useCartCount } from "../hooks/useCartCount";
import { AuthContext } from "../../context/AuthContext";

const DashboardNavbar = ({ activePage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartCount = useCartCount();
  const { user } = useContext(AuthContext);

  return (
    <header className="navbar" data-aos="fade-down">
      <div className="logo">
        <img
          src="/assets/logo.png"
          alt="Logo"
          onClick={() => navigate("/inicio")}
          style={{ cursor: "pointer" }}
        />
      </div>

      <button
        className={`toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="bars" id="bar1"></span>
        <span className="bars" id="bar2"></span>
        <span className="bars" id="bar3"></span>
      </button>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <Link to="/inicio" className={activePage === "inicio" ? "active" : ""}>
          <House />
          Inicio
        </Link>
        <Link
          to="/catalogo"
          className={activePage === "catalogo" ? "active" : ""}
        >
          <Hamburger />
          Catálogo
        </Link>
        <Link
          to="/carrito"
          className={activePage === "carrito" ? "active" : ""}
        >
          <ShoppingCart />
          Carrito{" "}
          {cartCount > 0 && (cartCount === 99 ? "+99" : `+${cartCount}`)}
        </Link>
        <Link
          to="/pedidos"
          className={activePage === "pedidos" ? "active" : ""}
        >
          <Package />
          Mis pedidos
        </Link>
        {user?.tipo === "admin" && (
          <Link to="/admin-panel" className="nav-link">
            Panel Admin
          </Link>
        )}
        <Link to="/cuenta" className={activePage === "cuenta" ? "active" : ""}>
          <User />
          {user?.nombre || "Usuario"}
        </Link>
      </nav>
    </header>
  );
};

export default DashboardNavbar;
