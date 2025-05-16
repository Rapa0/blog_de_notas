import React, { useState, useEffect } from "react";
import "./Popup.css";
import type { Nota } from "../types/Nota";

interface PopupProps {
  nota: Nota;
  onClose: () => void;
  onEdit: (updated: { titulo: string; contenido: string; fechaCreacion: string }) => void;
  onDelete: () => void;
  onUpdateNote: (updated: Nota) => void; // Nueva prop para actualizar la nota seleccionada en tiempo real
}

const Popup: React.FC<PopupProps> = ({ nota, onClose, onEdit, onDelete, onUpdateNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titulo, setTitulo] = useState(nota.titulo);
  const [contenido, setContenido] = useState(nota.contenido);

  // Sincroniza los campos cuando se actualiza la nota recibida
  useEffect(() => {
    setTitulo(nota.titulo);
    setContenido(nota.contenido);
  }, [nota]);

  const handleSave = () => {
    const updatedNota = {
      ...nota,
      titulo,
      contenido,
    };
    onEdit({ titulo, contenido, fechaCreacion: nota.fechaCreacion });
    onUpdateNote(updatedNota); // Actualiza la nota en el estado del Popup sin cerrarlo
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTitulo(nota.titulo);
    setContenido(nota.contenido);
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="popup-input"
            />
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="popup-textarea"
            />
            <div className="button-group">
              <button onClick={handleSave}>Guardar</button>
              <button onClick={handleCancel}>Cancelar</button>
              <button onClick={handleDelete} style={{ backgroundColor: "#e57373" }}>
                Eliminar
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="popup-title">
              {nota.titulo.length > 30 ? nota.titulo.substring(0, 30) + "..." : nota.titulo}
            </h2>
            <div className="popup-view-text">
              <p>{nota.contenido}</p>
            </div>
            <div className="button-group">
              <button onClick={() => setIsEditing(true)}>Editar</button>
              <button onClick={onClose}>Cerrar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Popup;