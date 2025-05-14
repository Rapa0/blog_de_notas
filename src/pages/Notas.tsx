import { useState, useEffect } from "react";
import "./Notas.css";
import NotaCard from "../componentes/NotaCard";

function Notas() {
  const [notas, setNotas] = useState<{ id: number; titulo: string; contenido: string }[]>([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    const notasGuardadas = localStorage.getItem("notas");
    if (notasGuardadas) {
      setNotas(JSON.parse(notasGuardadas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notas", JSON.stringify(notas));
  }, [notas]);

  const agregarNota = () => {
    if (!titulo.trim() || !contenido.trim()) return;
    const nuevaNota = { id: Date.now(), titulo, contenido };
    setNotas([...notas, nuevaNota]);
    setTitulo("");
    setContenido("");
  };

  const eliminarNota = (id: number) => {
    setNotas(notas.filter((nota) => nota.id !== id));
  };

  const iniciarEdicion = (id: number, tituloActual: string, contenidoActual: string) => {
    setEditandoId(id);
    setTitulo(tituloActual);
    setContenido(contenidoActual);
  };

  const guardarEdicion = () => {
    setNotas(notas.map((nota) =>
      nota.id === editandoId ? { ...nota, titulo, contenido } : nota
    ));
    setEditandoId(null);
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
        {editandoId ? (
          <button onClick={guardarEdicion}>Guardar Cambios</button>
        ) : (
          <button onClick={agregarNota}>Agregar Nota</button>
        )}
      </div>

      <div className="notas-grid">
        {notas.map((nota) => (
          <NotaCard
            key={nota.id}
            nota={nota}
            onEdit={() => iniciarEdicion(nota.id, nota.titulo, nota.contenido)}
            onDelete={() => eliminarNota(nota.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Notas;