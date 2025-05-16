import React from "react";
import { useSyncNote } from "../hooks/useSyncNote";
import "./Popup.css";
import type { Nota } from "../types/Nota";

interface NotaPopupEditProps {
  nota: Nota;
  onSave: (updated: {
    titulo: string;
    contenido: string;
    fechaCreacion: string;
  }) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const NotaPopupEdit: React.FC<NotaPopupEditProps> = ({
  nota,
  onSave,
  onCancel,
  onDelete,
}) => {
  const { titulo, setTitulo, contenido, setContenido } = useSyncNote(nota);

  const handleSave = () => {
    onSave({ titulo, contenido, fechaCreacion: nota.fechaCreacion });
  };

  return (
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
        <button onClick={onCancel}>Cancelar</button>
        <button onClick={onDelete} style={{ backgroundColor: "#e57373" }}>
          Eliminar
        </button>
      </div>
    </>
  );
};

export default NotaPopupEdit;
