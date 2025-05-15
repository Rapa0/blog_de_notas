import React, {
  useState,
  useContext,
  useMemo,
  useCallback,
  type ChangeEvent,
} from "react";
import "./Notas.css";
import NotaCard from "../componentes/NotaCard";
import { NotasContext } from "../context/NotasContext";

const Notas: React.FC = () => {
  const { notas, agregarNota, eliminarNota, editarNota } = useContext(NotasContext)!;
  
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

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

  const handleDelete = useCallback(
    (id: string) => {
      return () => {
        eliminarNota(id);
      };
    },
    [eliminarNota]
  );

  const renderedNotas = useMemo(() => (
    notas.map((nota) => (
      <NotaCard
        key={nota.id}
        nota={nota}
        onEdit={handleEdit(nota.id, nota.fechaCreacion)}
        onDelete={handleDelete(nota.id)}
      />
    ))
  ), [notas, handleEdit, handleDelete]);

  const handleTituloChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTitulo(e.target.value);
    },
    []
  );

  const handleContenidoChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContenido(e.target.value);
    },
    []
  );

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
    </div>
  );
};

export default Notas;