import { useNavigate } from "react-router-dom";
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
} from "lucide-react";
import "./DashboardInicio.css";

const DashboardInicio = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    alert("Sesión cerrada exitosamente");
    navigate("/");
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo"><img src="/assets/logo.png" alt="" /></div>
        <nav className="nav">
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
            Carrito
          </a>
          <a href="/pedidos">
            <Package />
            Mis pedidos
          </a>
        </nav>
        <div className="user-info">
          <User size={20} />
          <a href="/cuenta">Hola, Usuario</a>
        </div>
      </header>

      {/* Hero */}
      <section className="dashboard-hero">
        <div className="hero-content">
          <h1>¡Bienvenido, Usuario!</h1>
          <p>
            Bienvenido a tu tienda escolar favorita. Encontrá todo lo que
            necesitás para el colegio con entrega rápida y segura.
          </p>
          <button className="btn-hero">
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
            <a href="#">
              Explorar <Rocket />
            </a>
          </div>
          <div className="category-card bebidas">
            <CupSoda size={78} color="#2F66FF" />
            <h3>Bebidas</h3>
            <p>Gaseosas y jugos para acompañar tus comidas.</p>
            <a href="#">
              Explorar <Rocket />
            </a>
          </div>
          <div className="category-card utiles">
            <Backpack size={78} color="#4AE24D" />
            <h3>Útiles</h3>
            <p>Todo lo necesario para tu día a día en clase.</p>
            <a href="#">
              Explorar <Rocket />
            </a>
          </div>
          <div className="category-card otros">
            <Package size={78} color="#FF2F6D" />
            <h3>Otros</h3>
            <p>Mirá todo lo que tenemos para vos en un solo lugar.</p>
            <a href="#">
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
          {/* Cards individuales (pueden venir de props o JSON más adelante) */}
          <div className="product-card">
            <div className="icon">
              <img
                src="../../../../public/assets/products/product-cola.png"
                alt="Coca Cola"
              />
            </div>

            <div className="product-card-body">
              <span className="category-tag">Bebidas</span>
              <h3 className="product-name">Coca Cola 500ml</h3>
              <p className="product-description line-clamp-2">
                Refresco de cola, botella de 500ml
              </p>
              <div className="product-card-footer">
                <span className="product-price">$2.50</span>
                <button className="add-button ">
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="product-card">
            <div className="icon">
              <img
                src="../../../../public/assets/products/product-papa_fritas.png"
                alt="Lays"
              />
            </div>
            <div className="product-card-body">
              <span className="category-tag">Snacks</span>
              <h3 className="product-name">Papas Lays classic</h3>
              <p className="product-description line-clamp-2">
                crujientes, con un sabor a papa fresco y un toque de sal
              </p>
              <div className="product-card-footer">
                <span className="product-price">$2.50</span>
                <button className="add-button ">
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="product-card">
            <div className="icon">
              <img
                src="../../../../public/assets/products/product-chocolate-tita.png"
                alt="Tita"
              />
            </div>
            <div className="product-card-body">
              <span className="category-tag"></span>
              <h3 className="product-name">Chocolate Tita</h3>
              <p className="product-description line-clamp-2">
                es una oblea con relleno cremoso y cobertura de chocolate
              </p>
              <div className="product-card-footer">
                <span className="product-price">$2.50</span>
                <button className="add-button ">
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="product-card">
            <div className="icon">
              <img
                src="../../../../public/assets/products/product-saladix.png"
                alt="Saladix"
              />
            </div>
            <div className="product-card-body">
              <span className="category-tag">Snacks</span>
              <h3 className="product-name">Saladix jamon y queso</h3>
              <p className="product-description line-clamp-2">
                Saladix  sabor a jamón y queso, conocido por su textura
                crujiente y ligero.
              </p>
              <div className="product-card-footer">
                <span className="product-price">$2.50</span>
                <button className="add-button ">
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
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
