import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Valores simulados (hardcodeados)
    const validEmail = "usuario@correo.com";
    const validPassword = "123456";

    if (email === validEmail && password === validPassword) {
      localStorage.setItem("auth", "true"); // <- guardamos que está logueado
      setError("");
      navigate("/inicio");
    } else {
      setError("Correo o contraseña incorrectos.");
    }

  };

  return (
    <div className="container">
      <div className="login-container">
        {/* SECCIÓN FORMULARIO */}
        <div className="login-form-section">
          <h2 className="logo">El Punto Escolar</h2>
          <h3 className="title">Inicia Sesión</h3>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Correo Electrónico</label>
              <div className="input-icon">
                <Mail size={18} />
                <input type="email" placeholder="ejemplo@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
              </div>
            </div>

            <div className="input-container">
              <label>Contraseña</label>
              <div className="input-icon">
                <Lock size={18} />
                <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>

            <div className="login-options">
              <label>
                <input type="checkbox" />
                Recordarme
              </label>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}


            <button type="submit" className="login-btn">
              Iniciar Sesión
            </button>
          </form>

          <div className="register-link">
            ¿Ya tienes una cuenta? <a href="/registro">Crear Cuenta</a>
          </div>
        </div>

        {/* SECCIÓN ILUSTRACIÓN */}
        <div className="login-image-section">
          <img src="/assets/kids-snacks.png" alt="Niños merendando" />
        </div>
      </div>
    </div>
  );
};

export default Login;
