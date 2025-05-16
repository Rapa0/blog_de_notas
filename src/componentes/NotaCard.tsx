import React from "react";
import "./NotaCard.css";
import type { Nota } from "../types/Nota";

interface NotaCardProps {
  nota: Nota;
  onSelect: (nota: Nota) => void;
}

const NotaCard: React.FC<NotaCardProps> = ({ nota, onSelect }) => {
  return (
    <div
      className="nota-card-inner"
      onClick={() => onSelect(nota)}
      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
    >
      <h3>{nota.titulo}</h3>
      <p>
        {nota.contenido.length > 150
          ? nota.contenido.substring(0, 150) + "..."
          : nota.contenido}
      </p>
    </div>
  );
};

export default React.memo(NotaCard);