import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  ShoppingCart,
  User,
  PackageOpen,
  MoveRight,
  BookOpen,
  Rocket,
  Mail,
  MapPin,
  House,
  Hamburger,
  Package,
  Backpack,
  CupSoda,
  Popcorn,
  Plus,
  Menu,
  X,
} from "lucide-react";
import "./DashboardInicio.css";
import { useCartCount } from "../../../components/hooks/useCartCount";
import { catalogProducts } from "../../../components/CatalogData";

const DashboardInicio = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const cartCount = useCartCount();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    alert("Sesión cerrada exitosamente");
    navigate("/");
  };

  const products = catalogProducts.slice(0, 4);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((p) => p.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ id: product.id, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload(); // actualiza contador de carrito
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <img src="/assets/logo.png" alt="" />
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <a href="/inicio" className="active">
            <House />
            Inicio
          </a>
          <a href="/catalogo">
            <Hamburger />
            Catálogo
          </a>
          <a href="/carrito">
            <ShoppingCart />
            Carrito{" "}
            {cartCount > 0 && (cartCount === 99 ? "+99" : `+${cartCount}`)}
          </a>
          <a href="/pedidos">
            <Package />
            Mis pedidos
          </a>
          <a href="/cuenta">
            <User />
            Hola, Usuario
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="dashboard-hero">
        <div className="hero-content">
          <h1>¡Bienvenido, Usuario!</h1>
          <p>
            Bienvenido a tu tienda escolar favorita. Encontrá todo lo que
            necesitás para el colegio con entrega rápida y segura.
          </p>
          <button className="btn-hero" onClick={() => navigate("/catalogo")}>
            Ver catálogo
            <MoveRight size={16} />
          </button>
        </div>
      </section>

      {/* Categorías */}
      <section className="dashboard-categories">
        <h2>Categorías Populares</h2>
        <div className="category-cards">
          <div className="category-card snacks">
            <Popcorn size={78} color="#FF945E" />
            <h3>Snacks</h3>
            <p>Chocolates, papas y golosinas para tus recreos.</p>
            <a href={`/catalogo?categoria=Snacks`}>
              Explorar <Rocket />
            </a>
          </div>
          <div className="category-card bebidas">
            <CupSoda size={78} color="#2F66FF" />
            <h3>Bebidas</h3>
            <p>Gaseosas y jugos para acompañar tus comidas.</p>
            <a href={`/catalogo?categoria=Bebidas`}>
              Explorar <Rocket />
            </a>
          </div>
          <div className="category-card utiles">
            <Backpack size={78} color="#4AE24D" />
            <h3>Útiles</h3>
            <p>Todo lo necesario para tu día a día en clase.</p>
            <a href={`/catalogo?categoria=Útiles`}>
              Explorar <Rocket />
            </a>
          </div>
          <div className="category-card otros">
            <Package size={78} color="#FF2F6D" />
            <h3>Otros</h3>
            <p>Mirá todo lo que tenemos para vos en un solo lugar.</p>
            <a href={`/catalogo?categoria=Otros`}>
              Explorar <Rocket />
            </a>
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="dashboard-featured">
        <h2>Productos Destacados</h2>
        <p>Los más populares entre nuestros estudiantes</p>
        <div className="product-container">
          {products.map((product) => (
            <div
              className="product-card hoverable"
              onClick={() => navigate(`/catalogo?producto=${product.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="icon">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-card-body">
                <span className="category-tag">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description line-clamp-2">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h2 className="footer-logo">El Punto Escolar</h2>
            <p>Tu tienda escolar siempre disponible</p>
          </div>
          <div className="footer-column">
            <h4>Enlaces rápidos</h4>
            <ul className="footer-links">
              <li>
                <a href="#">Inicio</a>
              </li>
              <li>
                <a href="#">Catálogo</a>
              </li>
              <li>
                <a href="#">Carrito</a>
              </li>
              <li>
                <a href="#">Mis Pedidos</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contactos</h4>
            <div className="footer-contact">
              <div className="contact-link">
                <div className="icon">
                  <Mail size={18} />
                </div>
                <p>contacto@mikiosco.edu</p>
              </div>
              <div className="contact-link">
                <div className="icon">
                  <MapPin size={18} />
                </div>
                <p>no existe la calle 231</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 Mi Kiosco Escolar. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default DashboardInicio;
