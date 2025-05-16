import React, { useState, useContext, useMemo, useCallback, type ChangeEvent } from "react";
import "./Notas.css";
import NotaCard from "../componentes/NotaCard"; 
import Popup from "../componentes/Popup";         
import { NotasContext } from "../context/NotasContext";
import type { Nota } from "../types/Nota";

const Notas: React.FC = () => {
  const { notas, agregarNota, eliminarNota, editarNota } = useContext(NotasContext)!;
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  
  // Estado para la nota seleccionada (para el Popup)
  const [notaSeleccionada, setNotaSeleccionada] = useState<Nota | null>(null);

  const handleAgregarNota = useCallback(async () => {
    if (!titulo.trim() || !contenido.trim()) return;
    const nuevaNota = {
      titulo,
      contenido,
      fechaCreacion: new Date().toISOString(),
    };
    await agregarNota(nuevaNota);
    setTitulo("");
    setContenido("");
  }, [titulo, contenido, agregarNota]);

  // Callback para editar la nota en el backend
  const handleEdit = useCallback(
    (id: string, fechaCreacion: string) => {
      return (updated: { titulo: string; contenido: string }) => {
        editarNota(id, {
          titulo: updated.titulo,
          contenido: updated.contenido,
          fechaCreacion,
        });
      };
    },
    [editarNota]
  );

  // Callback para eliminar la nota
  const handleDelete = useCallback(
    (id: string) => {
      return () => {
        eliminarNota(id);
      };
    },
    [eliminarNota]
  );

  // Aquí definimos los tipos de los parámetros para evitar 'any'
  const renderedNotas = useMemo(
    () =>
      notas.map((nota) => (
        <NotaCard
          key={nota.id}
          nota={nota}
          onSelect={(selectedNota: Nota) => setNotaSeleccionada(selectedNota)}
        />
      )),
    [notas]
  );

  const handleTituloChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value), []);
  const handleContenidoChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => setContenido(e.target.value), []);

  return (
    <div className="notas-container">
      <h2>Mis Notas</h2>
      <div className="form-container">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={handleTituloChange}
        />
        <textarea
          placeholder="Contenido"
          value={contenido}
          onChange={handleContenidoChange}
        />
        <button onClick={handleAgregarNota}>Agregar Nota</button>
      </div>
      <div className="notas-grid">{renderedNotas}</div>
      
      {notaSeleccionada && (
        <Popup
          nota={notaSeleccionada}
          onClose={() => setNotaSeleccionada(null)}
          onEdit={handleEdit(notaSeleccionada.id, notaSeleccionada.fechaCreacion)}
          onDelete={handleDelete(notaSeleccionada.id)}
          onUpdateNote={(updatedNota: Nota) => setNotaSeleccionada(updatedNota)}
        />
      )}
    </div>
  );
};

export default Notas;