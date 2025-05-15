import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Header.css"; 

export default function Logout() {
    const { logout } = useContext(AuthContext);

return (
    <button className="logout-btn" onClick={logout}>
        Cerrar sesión
    </button>
);
}
