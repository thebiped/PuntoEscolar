import "./Account.css";
import {
  User,
  Mail,
  MapPin,
  Edit2,
  LogOut,
  Trash2,
  Clock,
  ArrowLeft,
  Check,
  X,
} from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [originalValues, setOriginalValues] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "Usuario",
    correo: user?.correo || "usuario@ejemplo.com",
    direccion: "Av. Siempre Viva 123",
  });

  const [originalData, setOriginalData] = useState(formData);
  
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditToggle = () => {
    setOriginalData(formData);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleEdit = () => {
    setOriginalValues(formData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setShowConfirmModal(true);
  };

  const confirmSave = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
    setIsEditing(false);
  };

  const cancelSave = () => {
    setFormData(originalValues);
    setIsEditing(false);
    setShowConfirmModal(false);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

   const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const hasChanges =
    JSON.stringify(formData) !== JSON.stringify(originalValues);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="account-page">
      {/* Volver */}
      <button
        className="back-button"
        onClick={() => navigate(-1)}
        data-aos="fade-down"
      >
        <ArrowLeft size={18} /> Volver
      </button>

      {/* Hero */}
      <section className="account-hero" data-aos="fade-up">
        <div className="account-content">
          <div
            className="account-content-header"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <div className="icon" data-aos="zoom-in" data-aos-delay="150">
              <User size={36} />
            </div>
            <h1>¡Hola, {formData.nombre}!</h1>
          </div>
          <div className="account-content-body">
            <p>
              Gestiona tu información personal, revisa tu actividad y
              personaliza tu experiencia de compra.
            </p>
            <div
              className="hero-actions"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {!isEditing && (
                <button className="btn-primary" onClick={handleEditToggle}>
                  <Edit2 size={16} />
                  Editar Perfil
                </button>
              )}
              <button className="btn-outline">
                <Clock size={16} />
                Ver Historial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Información personal */}
      <section className="account-info-card" data-aos="fade-up">
        <div className="card-header">
          <h2>Información Personal</h2>
          {isEditing && (
            <div className="edit-controls">
              <button className="save-button" onClick={handleSave}>
                <Check size={16} />
                Guardar
              </button>
              <button className="cancel-button" onClick={handleCancelEdit}>
                <X size={16} />
                Cancelar
              </button>
            </div>
          )}
        </div>

        <div className="info-field" data-aos="fade-right" data-aos-delay="100">
          <label>
            <User size={16} /> Nombre
          </label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>
        <div className="info-field" data-aos="fade-right" data-aos-delay="200">
          <label>
            <Mail size={16} /> Correo Electrónico
          </label>
          <input
            type="email"
            value={formData.correo}
            onChange={(e) =>
              setFormData({ ...formData, correo: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>
        <div className="info-field" data-aos="fade-right" data-aos-delay="300">
          <label>
            <MapPin size={16} /> Dirección
          </label>
          <input
            type="text"
            value={formData.direccion}
            onChange={(e) =>
              setFormData({ ...formData, direccion: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>
      </section>

      {/* Acciones rápidas */}
      <section className="account-actions" data-aos="fade-up">
        <h2>Acciones Rápidas</h2>
        <div
          className="action-buttons"
          data-aos="zoom-in-up"
          data-aos-delay="100"
        >
          <button
            className="logout-button"
            onClick={handleLogout}
            data-aos="zoom-in-up"
            data-aos-delay="100"
          >
            <div className="icon">
              <LogOut size={16} />
            </div>
            <div className="content">
              <h3>Cerrar Sesión</h3>
              <span>Salir de tu cuenta de forma segura</span>
            </div>
          </button>
          <button
            className="delete-button"
            data-aos="zoom-in-up"
            data-aos-delay="200"
          >
            <div className="icon">
              <Trash2 size={16} />
            </div>
            <div className="content">
              <h3>Eliminar cuenta</h3>
              <span>Eliminar definitivamente tu cuenta</span>
            </div>
          </button>
        </div>
      </section>

      {/* Modal de confirmación */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content" data-aos="zoom-in">
            <h3>¿Guardar cambios?</h3>
            <p>
              ¿Estás seguro de que deseas guardar los cambios realizados en tu
              cuenta?
            </p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={confirmSave}>
                Sí, guardar
              </button>
              <button className="cancel-btn" onClick={cancelSave}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content success">
            <div className="success-header">
              <div className="success-icon">
                <Check size={20} />
              </div>
              <h3>¡Cambios guardados!</h3>
            </div>
            <p>Los datos de tu cuenta fueron actualizados correctamente.</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={closeSuccessModal}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
