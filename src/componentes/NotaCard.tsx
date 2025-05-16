import React, { useState } from "react";
import "./NotaCard.css";

interface Nota {
  id: string;
  titulo: string;
  contenido: string;
  fechaCreacion: string;
}

interface NotaCardProps {
  nota: Nota;
  onEdit: (updated: { titulo: string; contenido: string; fechaCreacion: string }) => void;
  onDelete: () => void;
}

const NotaCard: React.FC<NotaCardProps> = ({ nota, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titulo, setTitulo] = useState(nota.titulo);
  const [contenido, setContenido] = useState(nota.contenido);


  const handleContainerClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEdit({ titulo, contenido, fechaCreacion: nota.fechaCreacion });
    setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEditing(false);
    setTitulo(nota.titulo);
    setContenido(nota.contenido);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      className={`nota-card-inner ${isEditing ? "edit-mode" : "collapsed"}`}
      onClick={handleContainerClick}
      style={{ cursor: isEditing ? "default" : "pointer", transition: "all 0.3s ease" }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            style={{ width: "100%", fontSize: "1.2rem", marginBottom: "0.5rem" }}
          />
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            style={{ width: "100%", height: "120px", marginBottom: "0.5rem" }}
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
          <h3>{nota.titulo}</h3>
          <p>
            {nota.contenido.length > 150
              ? nota.contenido.substring(0, 150) + "..."
              : nota.contenido}
          </p>
        </>
      )}
    </div>
  );
};

export default React.memo(NotaCard);