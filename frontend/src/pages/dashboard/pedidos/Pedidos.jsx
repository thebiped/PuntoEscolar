import "./Pedidos.css";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const pedidos = [
  {
    id: "ORD-001",
    direccion: "Av. Principal 123",
    total: 6.75,
    productos: 3,
    items: [
      {
        nombre: "Bebidas",
        cantidad: 2,
        precio: 2.5,
        subtotal: 5.0,
        categoria: "Bebidas",
        imagen: "../../../../public/assets/products/product-cola.png",
      },
      {
        nombre: "Maná Rellenas de Limón",
        cantidad: 1,
        precio: 1.75,
        subtotal: 1.75,
        categoria: "Snacks",
        imagen: "../../../../public/assets/products/product-mana.png",
      },
    ],
  },
  {
    id: "ORD-002",
    direccion: "E.E.S.T N°1",
    total: 12.5,
    productos: 4,
    items: [
      {
        nombre: "Cuaderno A4",
        cantidad: 3,
        precio: 3.25,
        subtotal: 9.75,
        categoria: "Útiles",
        imagen: "../../../../public/assets/products/product-hojas.png",
      },
      {
        nombre: "Bolígrafos Pack x3",
        cantidad: 1,
        precio: 2.75,
        subtotal: 2.75,
        categoria: "Útiles",
        imagen: "../../../../public/assets/products/product-boligrafos.png",
      },
    ],
  },
];

const Pedidos = () => {
  const totalGastado = pedidos.reduce((sum, p) => sum + p.total, 0);
  const handleLogout = () => {
    localStorage.removeItem("auth");
    alert("Sesión cerrada exitosamente");
    navigate("/");
  };
  return (
    <div className="pedidos-container">
      <header className="navbar">
        <div className="logo">
          <img src="/assets/logo.png" alt="" />
        </div>
        <nav className="nav">
          <a href="/inicio">
            <House />
            Inicio
          </a>
          <a href="/catalogo">
            <Hamburger />
            Catálogo
          </a>
          <a href="/carrito">
            <ShoppingCart />
            Carrito
          </a>
          <a href="/pedidos" className="active">
            <Package />
            Mis pedidos
          </a>
        </nav>
        <div className="user-info">
          <User size={20} />
          <a href="/cuenta">Hola, Usuario</a>
        </div>
      </header>

      <section className="pedidos-hero">
        <div className="pedidos-hero-header">
          <div className="icono">
            <Package size={32} color="#fff" />
          </div>
          <h1>Mis Pedidos</h1>
        </div>
        <p>
          Revisa el estado de tus pedidos, productos favoritos y mantenete al
          día con tus compras escolares.
        </p>
        <div className="hero-buttons">
          <button className="btn-catalogo">
            <ShoppingCart size={16} /> Hacer Nuevo Pedido
          </button>
          <button className="btn-cart">
            <Package size={16} /> Ver Carrito
          </button>
        </div>
      </section>

      <section className="estadisticas">
        <h3>Estadisticas</h3>
        <div className="estadisticas-cards">
          <div className="card azul">
            <Package />
            <div>
              <h4>Total pedidos: {pedidos.length}</h4>
            </div>
          </div>
          <div className="card rojo">
            <DollarSign />
            <div>
              <h4>Total gastado: ${totalGastado.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="historial">
        <div className="historial-header">
          <h2>Historial de Pedidos</h2>
          <span className="sub"><Clock />Mostrando {pedidos.length} pedidos</span>
        </div>
        {pedidos.map((p) => (
          <div className="pedido-box" key={p.id}>
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
                <div className="item-box" key={index}>
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
                        ${item.precio.toFixed(2)} c/u
                      </span>
                      <span className="subtotal">
                        ${item.subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
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

export default Pedidos;
