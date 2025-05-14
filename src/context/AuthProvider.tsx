import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import type { ReactNode } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuarioAutenticado");
        setUser(usuarioGuardado);
}, []);

    const login = (username: string) => {  
        localStorage.setItem("usuarioAutenticado", username);
        setUser(username);  // Guarda el usuario globalmente en `AuthContext`

};

    const logout = () => {
        localStorage.removeItem("usuarioAutenticado");
        setUser(null); // Borra el usuario cuando se cierra sesión

};

return (
    <AuthContext.Provider value={{ user, login, logout }}>
        {children}
    </AuthContext.Provider>
);
}