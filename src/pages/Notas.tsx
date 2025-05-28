// src/pages/Notas.tsx
import React, {
  useState,
  useContext,
  useMemo,
  useCallback,
  type ChangeEvent,
} from "react";
import "./Notas.css";
import NotaCard from "../componentes/NotaCard";
import Popup from "../componentes/Popup";
import ThemeMenu from "../componentes/ThemeMenu";
import { NotasContext } from "../context/NotasContext";
import type { Nota } from "../types/Nota";

const Notas: React.FC = () => {
  const { notas, agregarNota, eliminarNota, editarNota } =
    useContext(NotasContext)!;
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [notaSeleccionada, setNotaSeleccionada] = useState<Nota | null>(null);

  // Estado para el tema claro/oscuro
  const [notesStyle, setNotesStyle] = useState<string>("estilo-claro");
  // Nuevo estado para elegir entre "modern", "classic" y "futuristic".
  // Por default, es "modern".
  const [styleMode, setStyleMode] = useState<string>("modern");

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
    (id: string, fechaCreacion: string) =>
      (updated: { titulo: string; contenido: string }) => {
        editarNota(id, {
          titulo: updated.titulo,
          contenido: updated.contenido,
          fechaCreacion,
        });
      },
    [editarNota]
  );

  const handleDelete = useCallback(
    (id: string) => () => {
      eliminarNota(id);
    },
    [eliminarNota]
  );

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

  const handleTituloChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value),
    []
  );
  const handleContenidoChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setContenido(e.target.value),
    []
  );

  // Se arma la clase del contenedor según el styleMode
  const containerClass = `notas-container ${notesStyle} ${
    styleMode === "classic" ? "notas-paper" : ""
  } ${styleMode === "futuristic" ? "futuristic" : ""}`;

  return (
    <div className={containerClass}>
      <ThemeMenu
        notesStyle={notesStyle}
        setNotesStyle={setNotesStyle}
        styleMode={styleMode}
        setStyleMode={setStyleMode}
      />
      <div className="notas-content">
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
            onEdit={handleEdit(
              notaSeleccionada.id,
              notaSeleccionada.fechaCreacion
            )}
            onDelete={handleDelete(notaSeleccionada.id)}
            onUpdateNote={(updatedNota: Nota) =>
              setNotaSeleccionada(updatedNota)
            }
          />
        )}
      </div>
    </div>
  );
};

export default Notas;