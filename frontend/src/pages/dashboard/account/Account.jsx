// src/pages/dashboard/account/Account.jsx
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
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [originalValues, setOriginalValues] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "Usuario",
    correo: "usuario@ejemplo.com",
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
    setOriginalValues(formData); // Guarda los datos originales antes de editar
    setIsEditing(true);
  };

  // Al intentar guardar (se abre modal de confirmación)
  const handleSave = () => {
    setShowConfirmModal(true);
  };

  // Confirmar desde el modal
  const confirmSave = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true); // Mostrar modal de éxito
    setIsEditing(false);
  };

  // Cancelar desde el modal (volver a valores originales)
  const cancelSave = () => {
    setFormData(originalValues); // Restaura datos originales
    setIsEditing(false); // Cierra modo edición
    setShowConfirmModal(false); // Cierra modal
  };
  // Cerrar modal de éxito
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    alert("Sesión cerrada exitosamente");
    navigate("/");
  };

  const hasChanges =
    JSON.stringify(formData) !== JSON.stringify(originalValues);

  return (
    <div className="account-page">
      {/* Volver */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Volver
      </button>

      {/* Hero */}
      <section className="account-hero">
        <div className="icon">
          <User size={36} />
        </div>
        <div>
          <h1>¡Hola, {formData.nombre}!</h1>
          <p>
            Gestiona tu información personal, revisa tu actividad y personaliza
            tu experiencia de compra.
          </p>
        </div>
        <div className="hero-actions">
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
      </section>

      {/* Información personal */}
      <section className="account-info-card">
        <div className="card-header">
          <h2>Información Personal</h2>
          {isEditing && (
            <div className="edit-controls">
              <button className="save-button" onClick={handleSave}>
                Guardar
              </button>
              <button className="cancel-button" onClick={handleCancelEdit}>
                Cancelar
              </button>
            </div>
          )}
        </div>

        <div className="info-field">
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
        <div className="info-field">
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
        <div className="info-field">
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
      <section className="account-actions">
        <h2>Acciones Rápidas</h2>
        <div className="action-buttons">
          <button className="logout-button" onClick={handleLogout}>
            <div className="icon">
              <LogOut size={16} />
            </div>
            <div className="content">
              <h3>Cerrar Sesión</h3>
              <span>Salir de tu cuenta de forma segura</span>
            </div>
          </button>
          <button className="delete-button">
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
          <div className="modal-content">
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
            <h3>¡Cambios guardados!</h3>
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
