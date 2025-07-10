import { useState, useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out" });

    const handleResize = () => {
      AOS.refresh(); 
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validEmail = "usuario@correo.com";
    const validPassword = "123456";
    if (email === validEmail && password === validPassword) {
      localStorage.setItem("auth", "true");
      navigate("/inicio");
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        {/* FORMULARIO */}
        <div className="login-form-section" data-aos="fade-right">
          <div className="login-form-content">
            <h2 className="logo" data-aos="fade-up" data-aos-delay="100">
              El Punto Escolar
            </h2>
            <h3 className="title" data-aos="fade-up" data-aos-delay="200">
              Inicia Sesión
            </h3>
          </div>

          <form
            className="login-form"
            onSubmit={handleSubmit}
            data-aos="zoom-in-up"
            data-aos-delay="300"
          >
            <div
              className="input-container"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <label>Correo Electrónico</label>
              <div className="input-content-login">
                <Mail size={18} />
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div
              className="input-container"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <label>Contraseña</label>
              <div className="input-content-login">
                <Lock size={18} />
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div
              className="login-options"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <label>
                <input type="checkbox" />
                Recordarme
              </label>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            {error && (
              <p
                style={{ color: "red", fontSize: "0.9rem" }}
                data-aos="fade-in"
                data-aos-delay="700"
              >
                {error}
              </p>
            )}

            <div
              className="button-login"
            >
              <button type="submit" className="login-btn">
                Iniciar Sesión
              </button>
            </div>
          </form>

          <div
            className="register-link"
          >
            ¿Ya tienes una cuenta? <a href="/registro">Crear Cuenta</a>
          </div>
        </div>

        {/* ILUSTRACIÓN */}
        <div
          className="login-image-section"
          data-aos="zoom-in-left"
          data-aos-delay="500"
        >
          <img src="/assets/kids-snacks.png" alt="Niños merendando" />
        </div>
      </div>
    </div>
  );
};

export default Login;
