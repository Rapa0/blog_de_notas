import { createContext } from "react";
import type { Nota } from "../types/Nota";

interface NotasContextProps {
  notas: Nota[];
  setNotas: React.Dispatch<React.SetStateAction<Nota[]>>;
  agregarNota: (nota: Omit<Nota, "id" | "userId">) => Promise<void>;
  eliminarNota: (id: string) => Promise<void>;
  editarNota: (id: string, nota: Omit<Nota, "id" | "userId">) => Promise<void>;
}

export const NotasContext = createContext<NotasContextProps | null>(null);
