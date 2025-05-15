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

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div className={`nota-card-inner ${isEditing ? "edit-mode" : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
          />
          <div className="button-group">
            <button onClick={handleSave}>Guardar</button>
            <button onClick={handleCancel}>Cancelar</button>
          </div>
        </>
      ) : (
        <>
          <h3>{nota.titulo}</h3>
          <p>{nota.contenido}</p>
          <div className="button-group">
            <button onClick={handleEditClick}>Editar</button>
            <button onClick={handleDeleteClick}>Eliminar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default NotaCard;