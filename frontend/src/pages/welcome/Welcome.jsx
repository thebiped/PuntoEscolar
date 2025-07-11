import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Menu } from "lucide-react";
import {
  User,
  Mail,
  MapPin,
  Lock,
  Clock,
  CircleCheck,
  Package,
  Home,
  ShoppingBag,
  Truck,
  GraduationCap,
  ShieldCheck,
  Star,
  Instagram,
  Facebook,
  Phone,
  Popcorn,
  Rocket,
} from "lucide-react";
import "./Welcome.css";
import SocialModal from "../../components/Welcome/SocialModal";

const Welcome = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
  }, []);

  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <div className="welcome-page">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          <img src="/assets/logo.png" alt="" />
        </div>

        {/* Botón hamburguesa (solo en móvil) */}
        <button
          className={`toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="bars" id="bar1"></span>
          <span className="bars" id="bar2"></span>
          <span className="bars" id="bar3"></span>
        </button>

        {/* Menú de navegación */}
        <nav className={menuOpen ? "nav-menu open" : "nav-menu"}>
          <a href="#">Inicio</a>
          <a href="#">¿Cómo funciona?</a>
          <a href="#">Beneficios</a>
          <a href="#">Opiniones</a>
          <a href="#">Contacto</a>
        </nav>

        <div className="nav-buttons">
          <button className="btn-login">
            <a href="/login">Iniciar Sesión</a>
          </button>
          <button className="btn-register">
            <a href="/registro" className="user-profile-inner">
              Comenzar
            </a>
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text" data-aos="fade-up">
          <h1 className=".text-shadow-pop-bl">
            Tu tienda escolar <span>siempre disponible</span>
          </h1>
          <p>
            Pedí tus útiles escolares online y recibilos en el cole o en tu
            casa. Rápido, fácil y pensado especialmente para estudiantes.
          </p>
          <button className="button-hero">
            <div className="dots_border"></div>
            <div className="icon sparkle">
              <Rocket />
            </div>
            <span className="text_button">Comenzar Ahora</span>
          </button>
        </div>
        <div className="hero-img" data-aos="zoom-in">
          <img src="/assets/kids-snacks.png" />
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="steps">
        <h2>¿Cómo funciona?</h2>
        <p>En solo 3 pasos simples tenés todo lo que necesitás para el cole</p>
        <div className="steps-container">
          {/* Paso 1 */}
          <div className="step-card" data-aos="fade-up" data-aos-delay="100">
            <div className="blob"></div>
            <div className="bg">
              <div className="step-card-content">
                <div className="icon">
                  <CircleCheck size={48} color="#0035B2" />
                </div>
                <p>Registrate en menos de 1 minuto</p>
              </div>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="step-card" data-aos="fade-up" data-aos-delay="100">
            <div className="blob"></div>
            <div className="bg">
              <div className="step-card-content">
                <div className="icon">
                  <Popcorn size={48} color="#B21200" />
                </div>
                <p>Elegí tus productos del catálogo</p>
              </div>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="step-card" data-aos="fade-up" data-aos-delay="100">
            <div className="blob"></div>
            <div className="bg">
              <div className="step-card-content">
                <div className="icon">
                  <Truck size={48} color="#9D00B2" />
                </div>
                <p>Recibilos en el cole o en tu casa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="benefits">
        <div className="benefit-header">
          <h2>Beneficios</h2>
          <p>Diseñado especialmente para hacer tu vida estudiantil más fácil</p>
        </div>
        <div className="benefits-container">
          <div className="benefit-card" data-aos="zoom-in" data-aos-delay="100">
            <div className="benefit-card-content">
              <div className="icon">
                <ShoppingBag size={36} color="#FF2F6D" />
              </div>
              <div className="content">
                <h3>Catálogo escolar</h3>
                <p>Todo lo que necesitás para el cole en un solo lugar</p>
              </div>
            </div>
          </div>
          <div className="benefit-card" data-aos="zoom-in" data-aos-delay="100">
            <div className="benefit-card-content">
              <div className="icon">
                <Truck size={36} color="#FF2F6D" />
              </div>
              <div className="content">
                <h3>Entrega rápida</h3>
                <p>Recibí tus pedidos en el día o cuando lo necesites</p>
              </div>
            </div>
          </div>
          <div className="benefit-card" data-aos="zoom-in" data-aos-delay="100">
            <div className="benefit-card-content">
              <div className="icon">
                <GraduationCap size={36} color="#FF2F6D" />
              </div>
              <div className="content">
                <h3>Para estudiantes</h3>
                <p>Pensado y diseñado especialmente para vos</p>
              </div>
            </div>
          </div>
          <div className="benefit-card" data-aos="zoom-in" data-aos-delay="100">
            <div className="benefit-card-content">
              <div className="icon">
                <ShieldCheck size={36} color="#FF2F6D" />
              </div>
              <div className="content">
                <h3>Seguro y fácil</h3>
                <p>Pagos seguros y una experiencia super simple</p>
              </div>
            </div>
          </div>
        </div>
        <button className="btn-benefit">
          <a href="/registro" className="user-profile-inner">
            <div className="icon">
              <Rocket />
            </div>
            Comenzar Ahora
          </a>
        </button>
      </section>

      {/* OPINIONES */}
      <section className="testimonials">
        <div className="testimonials-header">
          <h2>Lo que dicen nuestros estudiantes</h2>
          <p>Miles de estudiantes ya confían en nosotros</p>
        </div>
        <div className="testimonial-container">
          <div className="testimonial" data-aos="fade-up" data-aos-delay="100">
            <div className="testimonial-content">
              <div className="header">
                <h4>María González</h4>
                <p>
                  <Star
                    color="#B20003"
                    fill="#FF2FEE"
                    size={16}
                    data-aos="fade-up"
                    data-aos-delay="100"
                  />{" "}
                  <Star
                    color="#B20003"
                    fill="#FF2FEE"
                    size={16}
                    data-aos="fade-up"
                    data-aos-delay="200"
                  />{" "}
                  <Star
                    color="#B20003"
                    fill="#FF2FEE"
                    size={16}
                    data-aos="fade-up"
                    data-aos-delay="300"
                  />{" "}
                  <Star
                    color="#B20003"
                    fill="#FF2FEE"
                    size={16}
                    data-aos="fade-up"
                    data-aos-delay="400"
                  />{" "}
                  <Star
                    color="#B20003"
                    fill="#FF2FEE"
                    size={16}
                    data-aos="fade-up"
                    data-aos-delay="500"
                  />
                </p>
              </div>
              <p>
                “Pedir mis útiles nunca fue tan fácil. Me ahorro tiempo y
                siempre tengo todo lo que necesito.”
              </p>
            </div>
          </div>
          <div className="testimonial" data-aos="fade-up" data-aos-delay="100">
            <div className="testimonial-content">
              <div className="header">
                <h4>Carlos Rodríguez</h4>
                <p>
                  <Star
                    color="#B20003"
                    fill="#FF2FEE"
                    size={16}
                    data-aos="fade-up"
                    data-aos-delay="100"
                  />{" "}
                  <Star
                    color="#B20003"
                    fill="#FF2FEE"
                    size={16}
                    data-aos="fade-up"
                    data-aos-delay="200"
                  />{" "}
                  <Star
                    color="#B20003"
                    fill="#FF2FEE"
                    size={16}
                    data-aos="fade-up"
                    data-aos-delay="300"
                  />{" "}
                  <Star
                    color="#B20003"
                    fill="#FF2FEE"
                    size={16}
                    data-aos="fade-up"
                    data-aos-delay="400"
                  />{" "}
                  <Star
                    color="#B20003"
                    fill="#FF2FEE"
                    size={16}
                    data-aos="fade-up"
                    data-aos-delay="500"
                  />
                </p>
              </div>
              <p>
                “Me llegó todo el mismo día que lo pedí. Súper rápido y todo
                llegó perfecto.”
              </p>
            </div>
          </div>
          <div className="testimonial" data-aos="fade-up" data-aos-delay="100">
            <div className="testimonial-content">
              <div className="header">
                <h4>Ana Martínez</h4>
                <p>
                  <Star
                    color="#B20003"
                    fill="#FF2FEE"
                    size={16}
                    data-aos="fade-up"
                    data-aos-delay="100"
                  />{" "}
                  <Star
                    color="#B20003"
                    fill="#FF2FEE"
                    size={16}
                    data-aos="fade-up"
                    data-aos-delay="200"
                  />{" "}
                  <Star
                    color="#B20003"
                    fill="#FF2FEE"
                    size={16}
                    data-aos="fade-up"
                    data-aos-delay="300"
                  />{" "}
                  <Star
                    color="#B20003"
                    fill="#FF2FEE"
                    size={16}
                    data-aos="fade-up"
                    data-aos-delay="400"
                  />{" "}
                  <Star
                    color="#B20003"
                    fill="#FF2FEE"
                    size={16}
                    data-aos="fade-up"
                    data-aos-delay="500"
                  />
                </p>
              </div>
              <p>
                “Lo mejor es que puedo pedir desde el celular en cualquier
                momento. Muy práctico.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REDES SOCIALES */}
      <section className="social">
        <div className="social-header">
          <h2>Conectate con nosotros</h2>
          <p>
            Seguinos en nuestras redes sociales y mantenete al día con todas las
            novedades
          </p>
        </div>
        <div className="social-container">
          <div
            className="social-card instagram"
            data-aos="zoom-in-up"
            data-aos-delay="150"
            onClick={() =>
              openModal({
                title: "Instagram",
                description: "Seguinos para ver productos y ofertas",
                link: "https://instagram.com/elpunto_escolar",
                icon: <Instagram size={28} />,
                color: "#ff2f6d",
              })
            }
          >
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>

            <div className="social-card-content">
              <div className="icon">
                <Instagram size={36} color="#fff" />
              </div>
              <h3>Instagram</h3>
              <div className="description">
                <h5>@elpunto_escolar</h5>
                <p>Seguinos para ver productos y ofertas</p>
              </div>
            </div>
          </div>
          <div
            className="social-card facebook"
            data-aos="zoom-in-up"
            data-aos-delay="150"
            onClick={() =>
              openModal({
                title: "Facebook",
                description: "Noticias y actualizaciones",
                link: "https://facebook.com",
                icon: <Facebook size={28} />,
                color: "#2f66ff",
              })
            }
          >
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>

            <div className="social-card-content">
              <div className="icon">
                <Facebook size={36} color="#fff" />
              </div>
              <h3>Facebook</h3>
              <div className="description">
                <h5>Mi Kiosco Escolar</h5>
                <p>Noticias y actualizaciones</p>
              </div>
            </div>
          </div>
          <div
            className="social-card whatsapp"
            data-aos="zoom-in-up"
            data-aos-delay="150"
            onClick={() =>
              openModal({
                title: "WhatsApp",
                description: "Consultas rápidas",
                link: "https://wa.me/5491155550123",
                icon: <Phone size={28} />,
                color: "#2fff8c",
              })
            }
          >
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>

            <div className="social-card-content">
              <div className="icon">
                <Phone size={36} color="#fff" />
              </div>
              <h3>WhatsApp</h3>
              <div className="description">
                <h5>11-5555-0123</h5>
                <p>Consultas rápidas</p>
              </div>
            </div>
          </div>
        </div>
        <SocialModal
          isOpen={isModalOpen}
          onClose={closeModal}
          data={modalData}
        />
      </section>

      {/* FOOTER */}
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
                <a href="#">¿Cómo funciona?</a>
              </li>
              <li>
                <a href="#">Beneficios</a>
              </li>
              <li>
                <a href="#">Opiniones</a>
              </li>
              <li>
                <a href="#">Contacto</a>
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

export default Welcome;
