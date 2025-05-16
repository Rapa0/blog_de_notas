import { useState, useEffect } from "react";
import type { Nota } from "../types/Nota";

export const useSyncNote = (nota: Nota) => {
  const [titulo, setTitulo] = useState(nota.titulo);
  const [contenido, setContenido] = useState(nota.contenido);

  useEffect(() => {
    setTitulo(nota.titulo);
    setContenido(nota.contenido);
  }, [nota]);

  return { titulo, setTitulo, contenido, setContenido };
};