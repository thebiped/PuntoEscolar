import { User, Mail, Lock } from "lucide-react";
import "./Register.css";

const Register = () => {
  return (
    <div className="container">
      <div className="register-container">
        <div className="register-form-section">
          <h2 className="logo">El Punto Escolar</h2>
          <h3 className="title">Crea tu propia cuenta</h3>

          <form className="register-form">
            <div className="input-container">
              <label>Nombre</label>
              <div className="input-icon">
                <User size={18} />
                <input type="text" placeholder="Tu nombre" />
              </div>
            </div>

            <div className="input-container">
              <label>Correo Electrónico</label>
              <div className="input-icon">
                <Mail size={18} />
                <input type="email" placeholder="ejemplo@correo.com" />
              </div>
            </div>

            <div className="input-container">
              <label>Contraseña</label>
              <div className="input-icon">
                <Lock size={18} />
                <input type="password" placeholder="••••••••" />
              </div>
            </div>

            <div className="input-container">
              <label>Confirmar Contraseña</label>
              <div className="input-icon">
                <Lock size={18} />
                <input type="password" placeholder="••••••••" />
              </div>
            </div>

            <div className="terms-checkbox">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                Acepto los <a href="#">Términos y Condiciones</a>
              </label>
            </div>

            <button className="register-btn" type="submit">
              Crear Cuenta
            </button>
          </form>

          <p className="login-link">
            ¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a>
          </p>
        </div>

        <div className="register-image-section">
          <img src="/assets/kids-snacks.png" alt="Niños merendando" />
        </div>
      </div>
    </div>
  );
};

export default Register;
