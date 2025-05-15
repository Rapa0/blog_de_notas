// src/pages/Notas.tsx
import React, { useState, useContext } from "react";
import "./Notas.css";
import NotaCard from "../componentes/NotaCard";
import { NotasContext } from "../context/NotasContext";

const Notas: React.FC = () => {
  const notasContext = useContext(NotasContext);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  if (!notasContext) return null;
  const { notas, agregarNota, eliminarNota, editarNota } = notasContext;

  const handleAgregarNota = async () => {
    if (!titulo.trim() || !contenido.trim()) return;
    const nuevaNota = {
      titulo,
      contenido,
      fechaCreacion: new Date().toISOString(),
    };
    await agregarNota(nuevaNota);
    setTitulo("");
    setContenido("");
  };

  return (
    <div className="notas-container">
      <h2>Mis Notas</h2>
      <div className="form-container">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Contenido"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
        />
        <button onClick={handleAgregarNota}>Agregar Nota</button>
      </div>
      {/* Versión sin drag & drop */}
      <div className="notas-grid">
        {notas.map((nota) => (
          <NotaCard
            key={nota.id}
            nota={nota}
            onEdit={(updated) => {
              console.log("onEdit callback received:", updated);
              editarNota(nota.id, {
                titulo: updated.titulo,
                contenido: updated.contenido,
                fechaCreacion: nota.fechaCreacion,
              });
            }}
            onDelete={() => {
              console.log("onDelete callback received for id:", nota.id);
              eliminarNota(nota.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Notas;