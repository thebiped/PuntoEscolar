import "./Pedidos.css";
import { useState, useEffect } from "react";
import {
  Package,
  ShoppingCart,
  DollarSign,
  MapPin,
  User,
  Mail,
  House,
  Hamburger,
  Clock,
  Menu,
  X,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { useCartCount } from "../../../components/hooks/useCartCount";
import { usePedidosLogic } from "../../../components/dashboard/pedido/usePedidosLogic";
import DashboardNavbar from "../DashboardNavbar";

const Pedidos = () => {
  const navigate = useNavigate();
  const cartCount = useCartCount();
  const { pedidos, totalGastado } = usePedidosLogic();

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="pedidos-container">
      <DashboardNavbar activePage="pedidos" />
      <section className="pedidos-hero" data-aos="fade-up">
        <div
          className="pedidos-hero-header"
          data-aos="zoom-in"
          data-aos-delay="150"
        >
          <div className="icono">
            <Package size={32} color="#fff" />
          </div>
          <h1>Mis Pedidos</h1>
        </div>
        <p>
          Revisa el estado de tus pedidos, productos favoritos y mantenete al
          día con tus compras escolares.
        </p>
        <div className="hero-buttons" data-aos="fade-up" data-aos-delay="300">
          <button className="btn-catalogo">
            <ShoppingCart size={16} /> Hacer Nuevo Pedido
          </button>
          <button className="btn-cart">
            <Package size={16} /> Ver Carrito
          </button>
        </div>
      </section>

      <section className="estadisticas" data-aos="fade-right">
        <h3>Estadisticas</h3>
        <div className="estadisticas-cards">
          <div className="card azul" data-aos="zoom-in-up" data-aos-delay="100">
            <Package />
            <div>
              <h4>Total pedidos: {pedidos.length}</h4>
            </div>
          </div>
          <div className="card rojo" data-aos="zoom-in-up" data-aos-delay="200">
            <DollarSign />
            <div>
              <h4>Total gastado: ${totalGastado.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="historial" data-aos="fade-up">
        <div
          className="historial-header"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <h2>Historial de Pedidos</h2>
          <span className="sub">
            <Clock />
            Mostrando {pedidos.length} pedidos
          </span>
        </div>
        {pedidos.length === 0 ? (
          <div className="no-pedidos" data-aos="zoom-in">
            <img
              src="/assets/empty-orders.png"
              alt="Sin pedidos"
              className="no-pedidos-img"
            />
            <h3>¡Aún no realizaste ningún pedido!</h3>
            <p>
              Explorá el catálogo y agregá productos para hacer tu primer
              pedido.
            </p>
            <a href="/catalogo" className="btn-ir-catalogo">
              Ir al Catálogo
            </a>
          </div>
        ) : (
          pedidos.map((p, index) => (
            <div
              className="pedido-box"
              key={p.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="pedido-header">
                <div className="pedido-header-icon">
                  <Package size={20} />
                </div>

                <div className="pedido-header-container">
                  <div className="pedido-total">
                    <h3>Pedido #{p.id}</h3>
                    <span>${p.total.toFixed(2)}</span>
                  </div>
                  <div className="pedido-info">
                    <span className="pedido-info-icon">
                      <MapPin size={14} /> Dirección de entrega: {p.direccion}
                    </span>
                    <span className="productos-count">
                      {p.productos} productos
                    </span>
                  </div>
                </div>
              </div>
              <div className="pedido-items">
                {p.items.map((item, index) => (
                  <div
                    className="item-box"
                    key={index}
                    data-aos="fade-left"
                    data-aos-delay={index * 150}
                  >
                    <div className="item-box-icon">
                      <img src={item.imagen} alt={item.nombre} />
                    </div>
                    <div className="item-box-content">
                      <div className="item-info">
                        <h4>{item.nombre}</h4>
                        <p>{item.categoria}</p>
                        <span className="cantidad">
                          Cantidad: {item.cantidad}
                        </span>
                      </div>
                      <div className="precio-info">
                        <span className="unit">
                          ${Number(item?.precio || 0).toFixed(2)} c/u
                        </span>
                        <span className="subtotal">
                          $
                          {Number(
                            item?.subtotal ??
                              (item?.precio || 0) * (item?.cantidad || 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
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

export default Pedidos;
