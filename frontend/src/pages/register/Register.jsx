import { useState, useEffect, useContext } from "react";
import { User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { register as registerService } from "../../services/auth";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    password2: "",
    tipo: "cliente",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out" });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (
      !formData.nombre ||
      !formData.correo ||
      !formData.password ||
      !formData.password2
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (formData.password !== formData.password2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!termsAccepted) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }

    setLoading(true);

    try {
      await registerService(formData);
      // Eliminamos la línea: login(data.user, data.token);
      setError("");
      // Mostramos mensaje de éxito y redirigimos al login
      alert("Registro exitoso. Por favor inicia sesión.");
      navigate("/login");
    } catch (error) {
      setError(error.detail || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="register-outer">
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
              {error && <div className="error-message">{error}</div>}
            </div>

            <form
              className="register-form"
              data-aos="zoom-in-up"
              data-aos-delay="300"
              onSubmit={handleSubmit}
            >
              <div
                className="input-container"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <label>Nombre</label>
                <div className="input-content-register">
                  <div className="icon">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                  />
                </div>
              </div>

              <div
                className="input-container"
                data-aos="fade-up"
                data-aos-delay="350"
              >
                <label>Apellido</label>
                <div className="input-content-register">
                  <div className="icon">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder="Tu apellido"
                  />
                </div>
              </div>

              <div
                className="input-container"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <label>Correo Electrónico</label>
                <div className="input-content-register">
                  <div className="icon">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>

              <div
                className="input-container"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <label>Contraseña</label>
                <div className="input-content-register">
                  <div className="icon">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div
                className="input-container"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <label>Confirmar Contraseña</label>
                <div className="input-content-register">
                  <div className="icon">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div
                className="terms-checkbox"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <label class="custom-checkbox">
                  <input 
                    type="checkbox" 
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <span class="box"></span>
                  Acepto términos y condiciones
                </label>
              </div>

              <div className="button-register">
                <button
                  className="register-btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Procesando..." : "Crear Cuenta"}
                </button>
              </div>
            </form>

            <p className="login-link">
              ¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a>
            </p>
          </div>

          {/* Imagen con animación de entrada */}
          <div
            className="register-image-section"
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

export default Register;
