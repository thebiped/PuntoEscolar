import { User, Mail, Lock } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Register.css";

const Register = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out" });
  }, []);

  return (
    <div className="container">
      <div className="register-container">
        {/* Sección izquierda con animación de entrada */}
        <div className="register-form-section" data-aos="fade-right">
          <div className="register-form-content">
            <h2 className="logo" data-aos="fade-up" data-aos-delay="100">
              El Punto Escolar
            </h2>
            <h3 className="title" data-aos="fade-up" data-aos-delay="200">
              Crea tu propia cuenta
            </h3>
          </div>

          <form
            className="register-form"
            data-aos="zoom-in-up"
            data-aos-delay="300"
          >
            <div className="input-container" data-aos="fade-up" data-aos-delay="400">
              <label>Nombre</label>
              <div className="input-content-register">
                <User size={18} />
                <input type="text" placeholder="Tu nombre" />
              </div>
            </div>

            <div className="input-container" data-aos="fade-up" data-aos-delay="300">
              <label>Correo Electrónico</label>
              <div className="input-content-register">
                <Mail size={18} />
                <input type="email" placeholder="ejemplo@correo.com" />
              </div>
            </div>

            <div className="input-container" data-aos="fade-up" data-aos-delay="200">
              <label>Contraseña</label>
              <div className="input-content-register">
                <Lock size={18} />
                <input type="password" placeholder="••••••••" />
              </div>
            </div>

            <div className="input-container" data-aos="fade-up" data-aos-delay="100">
              <label>Confirmar Contraseña</label>
              <div className="input-content-register">
                <Lock size={18} />
                <input type="password" placeholder="••••••••" />
              </div>
            </div>

            <div className="terms-checkbox" data-aos="fade-up" data-aos-delay="600">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                Acepto los <a href="#">Términos y Condiciones</a>
              </label>
            </div>

            <div className="button-register">
              <button className="register-btn" type="submit">
                Crear Cuenta
              </button>
            </div>
          </form>

          <p className="login-link" >
            ¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a>
          </p>
        </div>

        {/* Imagen con animación de entrada */}
        <div className="register-image-section" data-aos="zoom-in-left" data-aos-delay="500">
          <img src="/assets/kids-snacks.png" alt="Niños merendando" />
        </div>
      </div>
    </div>
  );
};

export default Register;
