import { useState, useEffect, useContext } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { login as loginService } from "../../services/auth";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out" });

    const handleResize = () => {
      AOS.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginService(email, password);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      login(data.user, data.access, data.refresh);

      navigate("/inicio");
    } catch (error) {
      setError(error.detail || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login-outer">
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
                    autoComplete="username"
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
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div
                className="login-options"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <label className="custom-checkbox">
                  <input type="checkbox" />
                  <span className="box"></span>
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

              <div className="button-login">
                <button type="submit" className="login-btn">
                  Iniciar Sesión
                </button>
              </div>
            </form>

            <div className="register-link">
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
    </div>
  );
};

export default Login;
