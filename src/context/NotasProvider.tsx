import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import type { Nota } from "../types/Nota";
import { NotasContext } from "./NotasContext";
import { AuthContext } from "./AuthContext";

export const NotasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchNotas() {
      if (!user) return;
      try {
        const q = query(collection(db, "notas"), where("userId", "==", user.uid));
        const snapshot = await getDocs(q);
        const notasList: Nota[] = snapshot.docs.map(docSnap => ({
          id: docSnap.id,
          titulo: docSnap.data().titulo,
          contenido: docSnap.data().contenido,
          fechaCreacion: docSnap.data().fechaCreacion,
          userId: docSnap.data().userId,
        }));
        setNotas(notasList);
      } catch (error) {
        console.error("Error al cargar notas:", error);
      }
    }
    fetchNotas();
  }, [user]);

  const agregarNota = async (nota: Omit<Nota, "id" | "userId">) => {
    if (!user) return;
    try {
      const notaConUser = { ...nota, userId: user.uid };
      const docRef = await addDoc(collection(db, "notas"), notaConUser);
      setNotas(prev => [...prev, { ...notaConUser, id: docRef.id }]);
    } catch (error) {
      console.error("Error al agregar nota:", error);
    }
  };

  const eliminarNota = async (id: string) => {
    try {
      await deleteDoc(doc(db, "notas", id));
      setNotas(prev => prev.filter(note => note.id !== id));
      console.log(`Nota eliminada: ${id}`);
    } catch (error) {
      console.error("Error al eliminar nota:", error);
    }
  };

  const editarNota = async (id: string, notaActualizada: Omit<Nota, "id" | "userId">) => {
    try {
      const notaRef = doc(db, "notas", id);
      await updateDoc(notaRef, { ...notaActualizada });
      setNotas(prev => prev.map(note => note.id === id ? { ...note, ...notaActualizada } : note));
      console.log(`Nota editada: ${id}`);
    } catch (error) {
      console.error("Error al editar nota:", error);
    }
  };

  return (
    <NotasContext.Provider value={{ notas, setNotas, agregarNota, eliminarNota, editarNota }}>
      {children}
    </NotasContext.Provider>
  );
};