import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import DashboardNavbar from "../../../components/navbar/DashboardNavbar";

import {
  MoveRight,
  BookOpen,
  Rocket,
  Mail,
  MapPin,
  Hamburger,
  Package,
  Backpack,
  CupSoda,
  Popcorn,
  Plus,
} from "lucide-react";
import "./DashboardInicio.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCartCount } from "../../../components/hooks/useCartCount";
import { catalogProducts } from "../../../components/CatalogData";

const DashboardInicio = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const cartCount = useCartCount();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

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
    window.location.reload();
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <DashboardNavbar activePage="inicio" />

      {/* Hero */}
      <section className="dashboard-hero" data-aos="fade-right">
        <div className="hero-content" data-aos="fade-up" data-aos-delay="200">
          <h1 data-aos="fade-up" data-aos-delay="300">
            ¡Bienvenido, {user?.nombre || "Usuario"}!
          </h1>
          <p data-aos="fade-up" data-aos-delay="400">
            Bienvenido a tu tienda escolar favorita. Encontrá todo lo que
            necesitás para el colegio con entrega rápida y segura.
          </p>
          <button
            className="btn-hero"
            data-aos="zoom-in"
            data-aos-delay="500"
            onClick={() => navigate("/catalogo")}
          >
            Ver catálogo
            <MoveRight size={16} />
          </button>
        </div>
      </section>

      {/* Categorías */}
      <section className="dashboard-categories">
        <h2 data-aos="fade-right">Categorías Populares</h2>
        <div className="category-cards">
          <div
            className="category-card snacks"
            data-aos="flip-left"
            data-aos-delay="100"
          >
            <div className="category-card-icon snacks">
              <img src="/assets/popcorn.png" alt="" />
            </div>
            <h3>Snacks</h3>
            <p>Chocolates, papas y golosinas para tus recreos.</p>
            <a href={`/catalogo?categoria=Snacks`}>
              Explorar <Rocket />
            </a>
          </div>
          <div
            className="category-card bebidas"
            data-aos="flip-left"
            data-aos-delay="200"
          >
            <div className="category-card-icon drink">
              <img src="/assets/drink.png" alt="" />
            </div>
            <h3>Bebidas</h3>
            <p>Gaseosas y jugos para acompañar tus comidas.</p>
            <a href={`/catalogo?categoria=Bebidas`}>
              Explorar <Rocket />
            </a>
          </div>
          <div
            className="category-card utiles"
            data-aos="flip-left"
            data-aos-delay="300"
          >
            <div className="category-card-icon util">
              <img src="/assets/backpack.png" alt="" />
            </div>
            <h3>Útiles</h3>
            <p>Todo lo necesario para tu día a día en clase.</p>
            <a href={`/catalogo?categoria=Útiles`}>
              Explorar <Rocket />
            </a>
          </div>
          <div
            className="category-card other"
            data-aos="flip-left"
            data-aos-delay="400"
          >
            <div className="category-card-icon other">
              <img src="/assets/box.png" alt="" />
            </div>
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
        <h2 data-aos="fade-left">Productos Destacados</h2>
        <p data-aos="fade-left" data-aos-delay="100">
          Los más populares entre nuestros estudiantes
        </p>
        <div className="product-container">
          {products.map((product, index) => (
            <div
              key={`product-${product.id}`}
              className="card"
              data-aos="zoom-in-up"
              data-aos-delay={index * 150}
              onClick={() => navigate(`/catalogo?producto=${product.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="container-image">
                <img
                  src={product.image}
                  alt={product.name}
                  className="image-circle"
                />
              </div>

              <div className="content">
                <div className="detail">
                  <span>{product.name}</span>
                  <p className="product-price">${product.price}</p>
                  <button>Ver</button>
                </div>

                <div className="product-image">
                  <div className="box-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-product"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" data-aos="fade-up">
        <div className="footer-content">
          <div
            className="footer-column"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <h2 className="footer-logo">El Punto Escolar</h2>
            <p>Tu tienda escolar siempre disponible</p>
          </div>
          <div
            className="footer-column"
            data-aos="fade-up"
            data-aos-delay="200"
          >
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
          <div
            className="footer-column"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <h4>Contactos</h4>
            <div className="footer-contact">
              <div className="contact-link">
                <div className="icon">
                  <Mail size={18} />
                </div>
                <p>puntoescolar@gmail.com</p>
              </div>
              <div className="contact-link">
                <div className="icon">
                  <MapPin size={18} />
                </div>
                <p>battipede y gúemes</p>
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
