// pages/dashboard/carrito/Carrito.jsx
import React, { useState } from "react";
import "./Carrito.css";
import {
  Minus,
  Plus,
  Trash,
  Mail,
  User,
  MapPin,
  House,
  Hamburger,
  ShoppingCart,
  Package,
  ShoppingBag,
  School,
  Home,
  Clock,
  Gift,
  Menu,
  X,
} from "lucide-react";
import { useCartCount } from "../../../components/hooks/useCartCount"; // ajustar ruta
import { useCarritoLogic } from "../../../components/dashboard/carrito/useCarritoLogic";

const Carrito = () => {
  const {
    selectedSchool,
    setSelectedSchool,
    deliveryMethod,
    setDeliveryMethod,
    address,
    setAddress,
    cartItems,
    setCartItems,
    updateQuantity,
    removeItem,
    subtotal,
    confirmarPedido,
  } = useCarritoLogic();

  const cartCount = useCartCount();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="cart-page">
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
          <a href="/inicio">
            <House />
            Inicio
          </a>
          <a href="/catalogo" className="active">
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
      {/* HERO */}
      <section className="cart-hero">
        <div className="cart-hero-text">
          <div className="cart-header">
            <div className="cart-hero-icon">
              <ShoppingBag size={70} />
            </div>
            <h1>Mi Carrito</h1>
          </div>
          <p>
            Revisá tus productos seleccionados y confirmá tu pedido. ¡Entrega
            rápida y segura garantizada!
          </p>
          <div className="cart-tags">
            <span className="tag">
              <Clock />
              Entrega en 24h
            </span>
            <span className="tag">
              <Gift />
              Envío gratis
            </span>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="cart-content">
        <div className="cart-items">
          <div className="cart-items-header">
            <h3>Productos en tu carrito</h3>
            <span className="item-count">{cartItems.length} artículos</span>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>{item.category}</p>
                <span className="price">${item.price.toFixed(2)}</span>
              </div>
              <div className="cart-controls">
                <button onClick={() => updateQuantity(item.id, -1)}>
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>
                  <Plus size={16} />
                </button>
                <button onClick={() => removeItem(item.id)}>
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="delivery-method">
            <h4>Método de Entrega</h4>
            <div className="delivery-method-container">
              <div
                className="input-container"
                onClick={() => setDeliveryMethod("domicilio")}
              >
                <label htmlFor="domicilio">Domicilio</label>
                <div
                  className={`input-icon-wrapper ${
                    deliveryMethod === "domicilio" ? "selected" : ""
                  }`}
                >
                  <span className="input-icon">
                    <Home size={16} />
                    <span>Domicilio</span>
                  </span>
                  <input
                    type="radio"
                    name="metodo"
                    id="domicilio"
                    value="domicilio"
                    checked={deliveryMethod === "domicilio"}
                    onChange={() => setDeliveryMethod("domicilio")}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              <div
                className="input-container"
                onClick={() => setDeliveryMethod("punto")}
              >
                <label htmlFor="punto">Punto Escolar</label>
                <div
                  className={`input-icon-wrapper ${
                    deliveryMethod === "punto" ? "selected" : ""
                  }`}
                >
                  <span className="input-icon">
                    <School size={16} />
                    <span>Punto escolar</span>
                  </span>
                  <input
                    type="radio"
                    name="metodo"
                    id="punto"
                    value="punto"
                    checked={deliveryMethod === "punto"}
                    onChange={() => setDeliveryMethod("punto")}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              {deliveryMethod === "domicilio" && (
                <div className="input-container">
                  <label htmlFor="direccion">Dirección de Entrega</label>
                  <div className="input-textarea-wrapper">
                    <span className="input-icon-textarea">
                      <MapPin size={16} />
                    </span>
                    <textarea
                      id="direccion"
                      placeholder="Ej: Calle Falsa 123, piso 2, depto B"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      rows={3}
                    />
                  </div>
                </div>
              )}
              {deliveryMethod === "punto" && (
                <div className="input-container">
                  <label htmlFor="escuela">Seleccionar Escuela</label>
                  <div className="input-select-wrapper">
                    <span className="input-icon-select">
                      <School size={16} />
                    </span>
                    <select
                      id="escuela"
                      value={selectedSchool}
                      onChange={(e) => setSelectedSchool(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="">Seleccioná una escuela</option>
                      <option value="escuela1">Escuela Primaria Nº1</option>
                      <option value="escuela2">Escuela Secundaria Nº2</option>
                      <option value="escuela3">Instituto Técnico Nº3</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="order-summary">
            <h4>Resumen del Pedido</h4>
            <p>
              Subtotal <span>${subtotal.toFixed(2)}</span>
            </p>
            <p>
              Envío <span className="green">Gratis</span>
            </p>
            <p className="total">
              Total <span>${subtotal.toFixed(2)}</span>
            </p>
            <button className="confirm-button" onClick={confirmarPedido}>
              Confirmar Pedido
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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

export default Carrito;
