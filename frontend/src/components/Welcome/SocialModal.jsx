import React, { useState } from "react";
import "./SocialModal.css";

const SocialModal = ({ isOpen, onClose, data }) => {
  const [closeHover, setCloseHover] = useState(false);

  if (!isOpen || !data) return null;

  return (
    <div className="social-modal-overlay" onClick={onClose}>
      <div className="social-modal" onClick={(e) => e.stopPropagation()}>
        {/* Botón animado */}
        <button
          className={`modal-close-animated ${closeHover ? "active" : ""}`}
          onClick={onClose}
          onMouseEnter={() => setCloseHover(true)}
          onMouseLeave={() => setCloseHover(false)}
          aria-label="Cerrar modal"
        >
          <span className="bar" id="bar1"></span>
          <span className="bar" id="bar2"></span>
          <span className="bar" id="bar3"></span>
        </button>

        <div
          className="modal-icon"
          style={{ backgroundColor: data.color || "#6366f1" }}
        >
          {data.icon}
        </div>
        <h3>{data.title}</h3>
        <p>{data.description}</p>
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="modal-button"
        >
          {data.buttonText || "Ir al sitio"}
        </a>
      </div>
    </div>
  );
};

export default SocialModal;
