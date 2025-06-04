import { useState } from "react";
import "./PopupMenu.css";

interface PopupMenuProps {
  setNotesStyle: (style: string) => void;
}

export default function PopupMenu({ setNotesStyle }: PopupMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Al seleccionar una opción, se actualiza el estilo y se cierra el menú
  const handleStyleChange = (style: string) => {
    setNotesStyle(style);
    setIsOpen(false);
  };

  return (
    <div className="popup-container">
      <button className="popup-toggle" onClick={() => setIsOpen(!isOpen)}>
          Opciones
      </button>
      {isOpen && (
        <div className="popup-menu">
          <ul>
            <li onClick={() => handleStyleChange("estilo-claro")}>
              Estilo Claro
            </li>
            <li onClick={() => handleStyleChange("estilo-oscuro")}>
              Estilo Oscuro
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}