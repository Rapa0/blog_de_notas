// src/context/AuthProvider.tsx
import { useState, useEffect } from "react";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import type { User } from "firebase/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) console.log(`✅ Usuario autenticado: ${u.uid}`);
      else console.warn("⚠️ No hay usuario autenticado.");
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    console.log(`✅ Sesión iniciada: ${userCredential.user.uid}`);
  };

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
    console.log("✅ Sesión cerrada.");
  };

  const register = async (email: string, password: string) => {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    console.log(`✅ Usuario registrado: ${userCredential.user.uid}`);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}