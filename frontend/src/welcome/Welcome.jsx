import React from "react";
import {
  User,
  Mail,
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
  Popcorn
} from "lucide-react";
import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-page">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">El Punto Escolar</div>
        <nav>
          <a href="#">Inicio</a>
          <a href="#">¿Cómo funciona?</a>
          <a href="#">Beneficios</a>
          <a href="#">Opiniones</a>
          <a href="#">Contacto</a>
        </nav>
        <div className="nav-buttons">
          <button className="btn-link">Iniciar Sesión</button>
          <button className="btn-primary">Comenzar</button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Tu tienda escolar <span>siempre disponible</span>
          </h1>
          <p>
            Pedí tus útiles escolares online y recibilos en el cole o en tu casa. Rápido,
            fácil y pensado especialmente para estudiantes.
          </p>
          <button className="btn-primary">Comenzar Ahora</button>
        </div>
        <div className="hero-img">
          <img src="./kids-snacks.png"/>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="steps">
        <h2>¿Cómo funciona?</h2>
        <p>En solo 3 pasos simples tenés todo lo que necesitás para el cole</p>
        <div className="steps-container">
          <div className="step-card">
            <div className="icon"><CircleCheck size={36} color="#0035B2" /></div>
            <p>Registrate en menos de 1 minuto</p>
          </div>
          <div className="step-card">
            <div className="icon"><Popcorn size={36}  color="#B21200" /></div>
            <p>Elegí tus productos del catálogo</p>
          </div>
          <div className="step-card">
            <div className="icon"><Truck size={36} color="#9D00B2" /></div>
            <p>Recibilos en el cole o en tu casa</p>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="benefits">
        <h2>Beneficios</h2>
        <p>Diseñado especialmente para hacer tu vida estudiantil más fácil</p>
        <div className="benefits-container">
          <div className="benefit-card">
            <div className="icon"><ShoppingBag  size={36} color="#FF2F6D" /></div>
            <h3>Catálogo escolar</h3>
            <p>Todo lo que necesitás para el cole en un solo lugar</p>
          </div>
          <div className="benefit-card">
            <div className="icon"><Truck size={36} color="#FF2F6D" /></div>
            <h3>Entrega rápida</h3>
            <p>Recibí tus pedidos en el día o cuando lo necesites</p>
          </div>
          <div className="benefit-card">
            <div className="icon"><GraduationCap size={36} color="#FF2F6D" /></div>
            <h3>Para estudiantes</h3>
            <p>Pensado y diseñado especialmente para vos</p>
          </div>
          <div className="benefit-card">
            <div className="icon"><ShieldCheck size={36} color="#FF2F6D" /></div>
            <h3>Seguro y fácil</h3>
            <p>Pagos seguros y una experiencia super simple</p>
          </div>
        </div>
        <button className="btn-primary">Comenzar Ahora</button>
      </section>

      {/* OPINIONES */}
      <section className="testimonials">
        <h2>Lo que dicen nuestros estudiantes</h2>
        <p>Miles de estudiantes ya confían en nosotros</p>
        <div className="testimonial-grid">
          <div className="testimonial">
            <h4>María González</h4>
            <p><Star color="#fbbf24" size={18} /> <Star color="#fbbf24" size={18} /> <Star color="#fbbf24" size={18} /> <Star color="#fbbf24" size={18} /> <Star color="#fbbf24" size={18} /></p>
            <p>“Pedir mis útiles nunca fue tan fácil. Me ahorro tiempo y siempre tengo todo lo que necesito.”</p>
          </div>
          <div className="testimonial">
            <h4>Carlos Rodríguez</h4>
            <p><Star color="#fbbf24" size={18} /> <Star color="#fbbf24" size={18} /> <Star color="#fbbf24" size={18} /> <Star color="#fbbf24" size={18} /> <Star color="#fbbf24" size={18} /></p>
            <p>“Me llegó todo el mismo día que lo pedí. Súper rápido y todo llegó perfecto.”</p>
          </div>
          <div className="testimonial">
            <h4>Ana Martínez</h4>
            <p><Star color="#fbbf24" size={18} /> <Star color="#fbbf24" size={18} /> <Star color="#fbbf24" size={18} /> <Star color="#fbbf24" size={18} /> <Star color="#fbbf24" size={18} /></p>
            <p>“Lo mejor es que puedo pedir desde el celular en cualquier momento. Muy práctico.”</p>
          </div>
        </div>
      </section>

      {/* REDES SOCIALES */}
      <section className="social">
        <h2>Conectate con nosotros</h2>
        <p>
          Seguinos en nuestras redes sociales y mantenete al día con todas las novedades
        </p>
        <div className="social-grid">
          <div className="social-card instagram">
            <Instagram size={28} color="#db2777" />
            <h3>Instagram</h3>
            <p>@mikioscoescolar<br />Seguinos para ver productos y ofertas</p>
          </div>
          <div className="social-card facebook">
            <Facebook size={28} color="#2563eb" />
            <h3>Facebook</h3>
            <p>Mi Kiosco Escolar<br />Noticias y actualizaciones</p>
          </div>
          <div className="social-card whatsapp">
            <Phone size={28} color="#10b981" />
            <h3>WhatsApp</h3>
            <p>11-5555-0123<br />Consultas rápidas</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-column">
          <h4 className="footer-logo">El Punto Escolar</h4>
          <p>Tu tienda escolar siempre disponible</p>
        </div>
        <div className="footer-column">
          <h4>Enlaces rápidos</h4>
          <p>inicio</p>
          <p>funciones</p>
          <p>beneficios</p>
          <p>opiniones</p>
        </div>
        <div className="footer-column">
          <h4>Contactos</h4>
          <p>📧 contacto@mikiosco.edu</p>
          <p>📍 no existe la calle 231</p>
        </div>
      </footer>
      <div className="footer-bottom">
        © 2025 Mi Kiosco Escolar. Todos los derechos reservados.
      </div>
    </div>
  );
};

export default Welcome;
