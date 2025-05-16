import React, { useState } from "react";
import "./Popup.css";
import type { Nota } from "../types/Nota";
import NotaPopupView from "./NotaPopupView";
import NotaPopupEdit from "./NotaPopupEdit";

interface PopupProps {
  nota: Nota;
  onClose: () => void;
  onEdit: (updated: {
    titulo: string;
    contenido: string;
    fechaCreacion: string;
  }) => void;
  onDelete: () => void;
  onUpdateNote: (updated: Nota) => void;
}

const Popup: React.FC<PopupProps> = ({
  nota,
  onClose,
  onEdit,
  onDelete,
  onUpdateNote,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updated: {
    titulo: string;
    contenido: string;
    fechaCreacion: string;
  }) => {
    onEdit(updated);
    // Se actualiza la nota seleccionada de forma inmediata sin cerrar el Popup
    onUpdateNote({
      ...nota,
      titulo: updated.titulo,
      contenido: updated.contenido,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        {isEditing ? (
          <NotaPopupEdit
            nota={nota}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={onDelete}
          />
        ) : (
          <NotaPopupView
            nota={nota}
            onEditMode={() => setIsEditing(true)}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default Popup;
