import React from "react";
import { truncateText } from "../utils/textHelpers";
import "./Popup.css";
import type { Nota } from "../types/Nota";

interface NotaPopupViewProps {
  nota: Nota;
  onEditMode: () => void;
  onClose: () => void;
}

const NotaPopupView: React.FC<NotaPopupViewProps> = ({ nota, onEditMode, onClose }) => {
  return (
    <>
      <h2 className="popup-title">
        {truncateText(nota.titulo, 30)}
      </h2>
      <div className="popup-view-text">
        <p>{nota.contenido}</p>
      </div>
      <div className="button-group">
        <button onClick={onEditMode}>Editar</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </>
  );
};

export default NotaPopupView;